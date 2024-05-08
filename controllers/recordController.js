const Record = require('../models/record');

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
