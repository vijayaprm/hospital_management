const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
exports.createAppointment = async (req, res) => {
    try {
        const { doctor_id, patient_id, date, time } = req.body;

        const doctorExists = await Doctor.exists({ doctor_id: doctor_id }); 
        if (!doctorExists) {
            return res.status(400).json({ error: 'Doctor not found. Create new doctor' });
        }

        const patientExists = await Patient.exists({ patient_id: patient_id }); 
        if (!patientExists) {
            return res.status(400).json({ error: 'Patient not found. Create new patient' }); 
        }

        const existingAppointment = await Appointment.findOne({ 
            doctor_id,
            date,
            time,
            status: { $ne: 'Cancel' }
        });

        if (existingAppointment) {
            return res.status(400).json({ error: 'Appointment slot already taken' });
        }
        const highestAppointId = await getHighestAppointId(); 
        const nextId = generateNextAppointId(highestAppointId);

        req.body.appointment_id = nextId;
        const newAppointment = new Appointment(req.body);
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAppointmentById = async (req, res) => {
    try {
        const targetAppointmentId = req.params.appointmentId; 
        // console.log(targetPatientId);
        const filteredAppointment = await Appointment.find({ appointment_id: targetAppointmentId });
        
        if (!filteredAppointment) {
            return res.status(404).json({ error: 'Appointment not found' }); 
        }
        res.json(filteredAppointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.appointmentId,
            req.body,
            { new: true } 
        );
        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json(updatedAppointment);
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.appointmentId);
        if (!deletedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' }); 
        }
        res.json({ message: 'Appointment deleted' }); 
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
};

async function getHighestAppointId() {
    const lastAppoint = await Appointment.findOne().sort({ appointment_id: -1 }); // Get the patient with the highest patient_id
    if (!lastAppoint) {
        return null; 
    }
    return lastAppoint.appointment_id;
}

function generateNextAppointId(highestAppointId) {
    if (!highestAppointId) {
        return 'APP1'; 
    }
    const numPart = parseInt(highestAppointId.substring(3), 10); // Extract the numeric part
    const nextNum = numPart + 1;
    return 'APP' + nextNum.toString();
}