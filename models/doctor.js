const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    doctor_id: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String },
    address: { type: String },
    experience: { type: String },
    specialization: { type: String } ,
    phone: { type: String }
});

module.exports = mongoose.model('Doctor', doctorSchema);
