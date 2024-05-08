const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    patient_id: { type: String, required: true },
    doctor_id: { type: String, required: true },
    date: { type: Date, required: true },
    symptoms: { type: String },
    tests: { type: String },
    diagnosis: { type: String },
    medicines: { type: String },
    suggestions: { type: String },
});

module.exports = mongoose.model('Record', recordSchema);
