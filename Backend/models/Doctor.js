import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: String,
  experience: Number,
  fees: Number,
  slots: [
    // Example slot: { date: '2025-09-01', time: '10:00', available: true }
    { date: String, time: String, available: { type: Boolean, default: true } }
  ],
  bio: String
}, { timestamps: true });

export default mongoose.model("Doctor", doctorSchema);
