import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  // true = vidro do box do card escuro (pra ler sobre mídias claras); false/ausente = vidro claro
  dark: Boolean,
  description: String,
  technologies: [String],
  github: String,
  live: String,
  image: String,
  video: String,
  order: Number,
});

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);