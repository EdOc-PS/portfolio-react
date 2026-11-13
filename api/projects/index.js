import { connectDB } from "../../lib/mongoose.js";
import Project from "../../models/Project.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    await connectDB();

    // `order` define a posição (0 = primeiro card, à esquerda; crescente daí em diante).
    // Sem `order` vai pro fim. O front exibe só os 5 primeiros dessa lista.
    const projects = (await Project.find().lean()).sort(
      (a, b) => (a.order ?? 9999) - (b.order ?? 9999)
    );

    return res.status(200).json({ success: true, projects });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar projetos",
    });
  }
}