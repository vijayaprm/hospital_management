const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// GET all appointments (potentially with filtering/search)
router.get('/', appointmentController.getAllAppointments);
// GET an appointment by ID
router.get('/:appointmentId', appointmentController.getAppointmentById);
// POST create a new appointment
router.post('/', appointmentController.createAppointment); 
// PUT update an appointment
router.put('/:appointmentId', appointmentController.updateAppointment);
// DELETE an appointment
router.delete('/:appointmentId', appointmentController.deleteAppointment);

module.exports = router;
