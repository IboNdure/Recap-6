import mongoose from "mongoose";

const { Schema } = mongoose;

const CitieSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  mapURL: { type: String, required: true },
  description: { type: String, required: true },
});

const Citie = mongoose.models.Citie || mongoose.model("Citie", CitieSchema);

export default Citie;
