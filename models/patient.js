const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patient_id: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String },
    address: { type: String },
    phone: { type: String },
    insurance_info: { type: String } 
});

module.exports = mongoose.model('Patient', patientSchema);
