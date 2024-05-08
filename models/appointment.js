const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctor_id: { type: String, required: true },
    patient_id: { type: String, required: true },
    appointment_id: { type: String, required: true },
    date: { type: Date },
    time: { type: String },
    status: { type: String } 
});

module.exports = mongoose.model('Appointment', appointmentSchema);
