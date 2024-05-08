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
        const patient = await Patient.findById(req.params.patientId);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
};

exports.createPatient = async (req, res) => {
    try {
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
