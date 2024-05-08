const Doctor = require('../models/doctor');

exports.getAllDoctors = async (req, res) => {
    try {
        // Add search by specialization or filtering capabilities later
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const targetDoctorId = req.params.doctorId; 
        const filteredDoctors = await Doctor.find({ doctor_id: targetDoctorId });

        if (!filteredDoctors) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json(filteredDoctors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createDoctor = async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findOneAndUpdate(
            { doctor_id: req.params.doctorId },
            {
                $set: {
                    name: req.body.name,
                    dob: req.body.dob,
                    gender: req.body.gender,
                    address: req.body.address,
                    experience: req.body.experience,
                    specialization: req.body.specialization,
                    phone: req.body.phone,
                },
            },
            { new: true, runValidators: true }
        );

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({ success: true, data: doctor });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};


exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findOneAndDelete({ doctor_id: req.params.doctorId });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({ success: true, message: 'Doctor deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

