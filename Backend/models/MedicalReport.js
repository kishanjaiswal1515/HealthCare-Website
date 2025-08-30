import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  filename: String,
  filepath: String,
  description: String,
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("MedicalReport", reportSchema);
