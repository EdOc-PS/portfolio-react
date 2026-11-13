import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
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