# EDOC — Portfólio v3

Portfólio pessoal de **Eduardo Octávio**: uma página única, escura, com os projetos em cards animados e uma aba "Sobre" em formato bento.

O projeto foi pensado para a **Vercel**: o front é estático (React + Vite) e o back roda como **Vercel Serverless Functions** na pasta `api/`, conectadas ao **MongoDB** e à **API do GitHub**.

---

## ✦ Destaques

- **Projetos** — até 5 cards vindos do Mongo, ordenados por `order`. No hover o card expande e toca o vídeo; no mobile vira um carrossel arrastável.
- **Sobre** — bento com frase sorteada do Mongo (troca a cada 15s), contribuições reais do GitHub, stack, redes e formulário de contato.
- **Detalhes** — loader em onda, cursor customizado, fundo de quadrados que reage ao mouse e um easter egg escondido.
- **Responsivo** — página única sem scroll a partir de `md`; abaixo disso, layout mobile com rolagem.

## 🧰 Stack

| Camada | Tecnologias |
|---|---|
| Front | React 19, TypeScript, Vite, Tailwind CSS 4, Motion, React Router |
| Back | Vercel Serverless Functions (Node), Mongoose |
| Serviços | MongoDB Atlas, API GraphQL do GitHub, Resend (e-mail) |
| Ícones | [Devicons](https://devicons.io) |

## 🔌 API (Vercel Functions)

| Rota | Método | O que faz |
|---|---|---|
| `/api/projects` | GET | Lista os projetos do Mongo, ordenados por `order` |
| `/api/projects/:id` | GET | Busca um projeto pelo id |
| `/api/phrases/random` | GET | Sorteia um `{ year, text }` da coleção `phrases` |
| `/api/github` | GET | Contribuições das últimas 5 semanas (cache de 1h) |
| `/api/send` | POST | Envia o formulário de contato por e-mail (Resend) |

## 🗂️ Estrutura

```
portfolio-react/
├─ api/                  # Serverless Functions da Vercel
│  ├─ projects/          #   GET projetos
│  ├─ phrases/           #   GET frase sorteada
│  ├─ github.js          #   GET contribuições do GitHub
│  ├─ send.js            #   POST contato
│  └─ emailTemplate.js   #   HTML do e-mail
├─ lib/mongoose.js       # Conexão com o MongoDB (reaproveitada entre chamadas)
├─ models/               # Schemas: Project, Phrase
├─ public/               # Vídeos dos projetos, stickers, favicon
└─ src/
   ├─ components/
   │  ├─ layout/         # Estrutura: header, cards, galeria, fundo
   │  │  └─ about/       #   Cards da aba Sobre
   │  └─ ui/             # Peças reutilizáveis: campos, ícones, modal, loader
   ├─ pages/             # projects/ e about/ — só montam os componentes
   ├─ routes/            # MainRoutes
   ├─ hooks/             # useIsMobile
   ├─ service/           # Requisições
   ├─ data/              # Conteúdo fixo do Sobre e projetos de teste
   ├─ lib/               # Animações compartilhadas
   └─ types/
```

## 🍃 MongoDB

Duas coleções no mesmo banco:

**`projects`**

```json
{
  "title": "Sinaliza",
  "subtitle": "TCC · Acessibilidade",
  "description": "...",
  "technologies": ["React.js", "Next.js"],
  "github": "https://github.com/...",
  "live": "https://...",
  "image": "",
  "video": "/projects/sinaliza.mp4",
  "order": 0,
  "dark": true
}
```

- `order` define a posição (0 = primeiro). Só os 5 menores aparecem.
- Sem `image`, o quadro dos 6s do `video` vira a capa.
- `dark: true` deixa o texto e os ícones do card escuros (para mídias claras).

**`phrases`**

```json
{ "year": 2023, "text": "Iniciei minha graduação em Sistemas de Informação." }
```

## ▶️ Rodando localmente

```bash
npm install
npm run dev        # só o front (as rotas /api usam dados de teste)
```

Para rodar o front **e** as rotas da `api/` como em produção:

```bash
npm i -g vercel
vercel link
vercel env pull .env.local
vercel dev
```

### Variáveis de ambiente

| Variável | Uso |
|---|---|
| `MONGO_URL` | Conexão com o MongoDB |
| `GITHUB_TOKEN` | Token de leitura para a API do GitHub |
| `RESEND_API_KEY` | Envio do e-mail de contato |
| `CONTACT_TO_EMAIL` | (opcional) Destino das mensagens |

---

Feito por [Eduardo Octávio](https://github.com/EdOc-PS) · [LinkedIn](https://www.linkedin.com/in/eduardo-octavio/)
