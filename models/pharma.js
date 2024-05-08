const mongoose = require('mongoose');

const pharmaSchema = new mongoose.Schema({
    pharma_id: { type: String, required: true },
    name: { type: String, required: true },
    Expiry_date: { type: Date, required: true },
    content: { type: String },
    description: { type: String },
    q_avail: { type: String },
    price: { type: String },
    precautions: { type: String },
});

module.exports = mongoose.model('Pharma', pharmaSchema);
