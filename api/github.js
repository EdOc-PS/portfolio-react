/**
 * GET /api/github → últimas 5 semanas de contribuições do GitHub (grade 7×5 do card "Contribuições").
 * Precisa da variável de ambiente GITHUB_TOKEN (fine-grained token, sem permissões extras).
 */
const GITHUB_USER = "EdOc-PS";
const DAYS = 35;

const LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }
`;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ success: false, message: "Defina GITHUB_TOKEN na Vercel" });
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_USER } }),
    });

    const json = await response.json();
    const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

    if (!response.ok || !weeks) {
      return res.status(502).json({ success: false, message: "Erro ao consultar o GitHub" });
    }

    const days = weeks.flatMap((w) => w.contributionDays).slice(-DAYS);
    const levels = days.map((d) => LEVELS[d.contributionLevel] ?? 0);
    const total = days.reduce((sum, d) => sum + d.contributionCount, 0);

    // Cache na CDN da Vercel por 1h (e serve o antigo enquanto atualiza) → poucas chamadas ao GitHub
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json({ success: true, levels, total });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Erro ao buscar contribuições" });
  }
}
