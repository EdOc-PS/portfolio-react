import mongoose from "mongoose";

/** Frases do card "Meu ano em código": cada documento é um ano + a frase embaixo dele. */
const PhraseSchema = new mongoose.Schema({
  year: Number,
  text: String,
});

export default mongoose.models.Phrase ||
  mongoose.model("Phrase", PhraseSchema, "phrases");
