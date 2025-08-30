import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  medicines: [{ name: String, dose: String, duration: String }],
  advice: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Prescription", prescriptionSchema);
