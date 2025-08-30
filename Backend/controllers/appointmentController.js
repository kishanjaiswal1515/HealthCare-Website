import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Prescription from "../models/Prescription.js";
import MedicalReport from "../models/MedicalReport.js";

export const bookAppointment = async (req, res) => {
  try {
    const patientId = req.user._id;
    const { doctorId, date, time, reason } = req.body;

    // check slot availability (basic)
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Very basic: we won't mark slot as unavailable here; front-end should ensure slot selection
    const appt = new Appointment({ patient: patientId, doctor: doctorId, date, time, reason });
    await appt.save();
    res.status(201).json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAppointmentsForUser = async (req, res) => {
  try {
    const user = req.user;
    let appointments;
    if (user.role === "doctor") {
      const doctor = await Doctor.findOne({ user: user._id });
      appointments = await Appointment.find({ doctor: doctor._id }).populate("patient", "name email");
    } else {
      appointments = await Appointment.find({ patient: user._id }).populate("doctor");
    }
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const changeAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const appt = await Appointment.findById(id);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });
    appt.status = status;
    await appt.save();
    res.json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Upload medical report
export const uploadReport = async (req, res) => {
  try {
    const patientId = req.user._id;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const report = new MedicalReport({
      patient: patientId,
      filename: req.file.originalname,
      filepath: req.file.path,
      description: req.body.description || ""
    });
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
