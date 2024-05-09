const Patient = require('../models/patient');

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const targetPatientId = req.params.patientId; 
        // console.log(targetPatientId);
        const filteredPatients = await Patient.find({ patient_id: targetPatientId });
        if (!filteredPatients) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json(filteredPatients); 
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }    

};

exports.createPatient = async (req, res) => {
    try {
        const highestPatientId = await getHighestPatientId(); 
        const nextId = generateNextPatientId(highestPatientId);

        req.body.patient_id = nextId;

        const newPatient = new Patient(req.body);
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.patientId,
            req.body,
            { new: true } // Option to return the updated document
        ); 
        if (!updatedPatient) {
            return res.status(404).json({ error: 'Patient not found' }); 
        }
        res.json(updatedPatient);
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.patientId);
        if (!deletedPatient) {
            return res.status(404).json({ error: 'Patient not found' }); 
        }
        res.json({ message: 'Patient deleted' }); 
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
};




async function getHighestPatientId() {
    const lastPatient = await Patient.findOne().sort({ patient_id: -1 }); // Get the patient with the highest patient_id
    if (!lastPatient) {
        return null; // No patients exist yet
    }
    return lastPatient.patient_id;
}

function generateNextPatientId(highestPatientId) {
    if (!highestPatientId) {
        return 'PAT1'; // First patient
    }
    const numPart = parseInt(highestPatientId.substring(3), 10); // Extract the numeric part
    const nextNum = numPart + 1;
    return 'PAT' + nextNum.toString();
}
