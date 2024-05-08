const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// GET all doctors (with optional search/filtering later)
router.get('/', doctorController.getAllDoctors); 
// GET a single doctor
router.get('/:doctorId', doctorController.getDoctorById);
// POST create a new doctor
router.post('/', doctorController.createDoctor); 
// PUT update a doctor
router.put('/:doctorId', doctorController.updateDoctor);
// DELETE a doctor
router.delete('/:doctorId', doctorController.deleteDoctor);

module.exports = router; 
