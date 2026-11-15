import mongoose from "mongoose";

const PhraseSchema = new mongoose.Schema({
  year: Number,
  text: String,
});

export default mongoose.models.Phrase ||
  mongoose.model("Phrase", PhraseSchema, "phrases");
