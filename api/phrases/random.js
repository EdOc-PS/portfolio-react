import { connectDB } from "../../lib/mongoose.js";
import Phrase from "../../models/Phrase.js";

/** GET /api/phrases/random → sorteia um documento da coleção "phrases" ({ year, text }). */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    await connectDB();

    // $sample sorteia direto no Mongo, sem trazer a coleção inteira
    const [phrase] = await Phrase.aggregate([{ $sample: { size: 1 } }]);

    if (!phrase) {
      return res.status(404).json({ success: false, message: "Nenhuma frase cadastrada" });
    }

    // Sem cache: cada visita sorteia de novo
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ success: true, phrase: { year: phrase.year, text: phrase.text } });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Erro ao sortear frase" });
  }
}
