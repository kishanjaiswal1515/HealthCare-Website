import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

export const createDoctorProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { specialization, experience, fees, bio } = req.body;
    
    // ensure user is a doctor role
    
    const user = await User.findById(userId);
    if (user.role !== "doctor") {
      return res.status(403).json({ message: "User is not a doctor" });
    }

    const existing = await Doctor.findOne({ user: userId });
    if (existing) return res.status(400).json({ message: "Profile already exists" });

    const doc = new Doctor({ user: userId, specialization, experience, fees, bio });
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const filter = {};
    if (req.query.specialization) filter.specialization = req.query.specialization;
    const doctors = await Doctor.find(filter).populate("user", "name email");
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addSlot = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor) return res.status(404).json({ message: "Doctor profile not found" });
    const { date, time } = req.body;
    doctor.slots.push({ date, time, available: true });
    await doctor.save();
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
