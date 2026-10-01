import { connectDB } from "../../lib/mongoose.js";
import Project from "../../models/Project.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    await connectDB();

    const projects = await Project.find();

    return res.status(200).json({ success: true, projects });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar projetos",
    });
  }
}