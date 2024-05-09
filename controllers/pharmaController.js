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
        const targetMedicineId = req.params.pharma_id; 
        // console.log(targetPatientId);
        const filteredMedicine = await Pharma.find({ pharma_id: targetMedicineId });
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
        const highestPharmaId = await getHighestPharmaId(); 
        const nextId = generateNextPharmaId(highestPharmaId);

        req.body.pharma_id = nextId;
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

async function getHighestPharmaId() {
    const lastPharma = await Pharma.findOne().sort({ pharma_id: -1 }); // Get the patient with the highest patient_id
    if (!lastPharma) {
        return null; 
    }
    return lastPharma.pharma_id;
}

function generateNextPharmaId(highestPharmaId) {
    if (!highestPharmaId) {
        return 'MED1'; 
    }
    const numPart = parseInt(highestPharmaId.substring(3), 10); // Extract the numeric part
    const nextNum = numPart + 1;
    return 'MED' + nextNum.toString();
}