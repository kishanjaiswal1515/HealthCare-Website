import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor", "admin"], default: "patient" },
  age: Number,
  gender: String,
  contact: String
}, { timestamps: true });

export default mongoose.model("User", userSchema);
