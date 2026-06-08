import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  github: String,
  live: String,
});

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);