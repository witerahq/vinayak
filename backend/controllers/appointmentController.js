// controllers/appointmentController.js

const Appointment = require("../models/Appointment");
const User = require("../models/User");

// Get all appointments for a specific patient
exports.getAppointmentsByPatientId = async (req, res) => {
  const { _id: patientId } = req.user;

  try {
    const appointments = await Appointment.find({ patientId }).populate(
      "patientId"
    );
    const populatedAppointments = await Appointment.populate(appointments, {
      path: "doctorId",
      model: User, // Specify the model to populate
    });

    console.log(populatedAppointments);

    // delete populatedAppointments.patientId.password
    // delete populatedAppointments.doctorId.password
    populatedAppointments.forEach((appointment) => {
      if (appointment.patientId) {
        delete appointment.patientId.password;
      }
      if (appointment.doctorId) {
        delete appointment.doctorId.password;
      }
    });

    res.status(200).json(populatedAppointments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error fetching appointments for the patient." });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    // Fetch appointment details by _id and populate full patient and doctor information
    const appointment = await Appointment.findById(appointmentId)
      .populate({
        path: 'patientId',
        select: '-password', // Exclude password field
      })
      .populate({
        path: 'doctorId',
        select: '-password', // Exclude password field
      });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all appointments for a specific doctor
exports.getAppointmentsByDoctorId = async (req, res) => {
  const { _id: doctorId } = req.user;

  try {
    // const appointments = await Appointment.find({ doctorId });
    // res.status(200).json(appointments);
    const appointments = await Appointment.find({ doctorId }).populate(
      "doctorId"
    );
    const populatedAppointments = await Appointment.populate(appointments, {
      path: "patientId",
      model: User, // Specify the model to populate
    });

    populatedAppointments.forEach((appointment) => {
      if (appointment.patientId) {
        delete appointment.patientId.password;
      }
      if (appointment.doctorId) {
        delete appointment.doctorId.password;
      }
    });
    res.status(200).json(populatedAppointments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error fetching appointments for the doctor." });
  }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
  const { doctorId, mode, time, status, medicalRecords, date, patientName, patientPhoneNumber } = req.body;

  try {
    const appointment = new Appointment({
      patientId: req.user._id,
      doctorId,
      mode,
      date:date.day,
      time,
      status,
      medicalRecords,
      patientName,
      patientPhoneNumber,
    });

    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating the appointment." });
  }
};

// Update the status of an appointment
exports.updateAppointmentStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating appointment status." });
  }
};

module.exports = exports;
