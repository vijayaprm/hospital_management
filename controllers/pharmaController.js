const Pharma = require('../models/pharma');

exports.getAllMedicines = async (req, res) => {
    try {
        const medicines = await Pharma.find(); 
        res.json(medicines);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMedicineById = async (req, res) => {
    try {
        const targetMedicineId = req.params.patientId; 
        // console.log(targetPatientId);
        const filteredMedicine = await Patient.find({ patient_id: targetMedicineId });
        if (!filteredMedicine) {
            return res.status(404).json({ error: 'Medicine not found' });
        }
        res.json(filteredMedicine);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createMedicine = async (req, res) => {
    try {
        const newMedicine = new Pharma(req.body);
        const savedMedicine = await newMedicine.save();
        res.status(201).json(savedMedicine);
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
};



exports.updateMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMedicine = req.body;

        const medicine = await Pharma.findByIdAndUpdate(id, updatedMedicine, { new: true });

        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        res.json(medicine);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteMedicine = async (req, res) => {
    try {
        const { id } = req.params;

        const medicine = await Pharma.findByIdAndDelete(id);

        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        res.json({ message: 'Medicine deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
