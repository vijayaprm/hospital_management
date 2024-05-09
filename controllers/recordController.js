const Record = require('../models/record');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');

exports.getAllRecords = async (req, res) => {
    try {
        // Add filtering based on patient_id, doctor_id, date ranges, etc., if needed 
        const records = await Record.find();
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getRecordById = async (req, res) => {
    try {
        const record = await Record.findById(req.params.recordId);
        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createRecord = async (req, res) => {
    try {
        const { doctor_id, patient_id,date } = req.body;

        const doctorExists = await Doctor.exists({ doctor_id: doctor_id }); 
        if (!doctorExists) {
            return res.status(400).json({ error: 'Doctor invalid. Create new doctor or use valid ID' });
        }

        const patientExists = await Patient.exists({ patient_id: patient_id }); 
        if (!patientExists) {
            return res.status(400).json({ error: 'Patient invalid . Create new patient or use valid ID' }); 
        }
        const existingRecord = await Doctor.findOne({ 
            doctor_id,
            patient_id,
            date 
        });

        if (existingRecord) {
            return res.status(400).json({ error: 'Record already exists for this doctor and patient on this date' });
        }
        const newRecord = new Record(req.body);
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateRecord = async (req, res) => {
    try {
        const updatedRecord = await Record.findByIdAndUpdate(
            req.params.recordId,
            req.body,
            { new: true } // Option to return the updated document
        );

        if (!updatedRecord) {
            return res.status(404).json({ error: 'Record not found' }); 
        }
        res.json(updatedRecord);
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
};

exports.deleteRecord = async (req, res) => {
    try {
        const deletedRecord = await Record.findByIdAndDelete(req.params.recordId);

        if (!deletedRecord) {
            return res.status(404).json({ error: 'Record not found' }); 
        }

        res.json({ message: 'Record deleted' });
    } catch (err) {
         res.status(500).json({ error: err.message }); 
    }
};
