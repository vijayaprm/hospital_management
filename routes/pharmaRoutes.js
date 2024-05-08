const express = require('express');
const router = express.Router();
const pharmaController = require('../controllers/pharmaController');

// GET all medicine (add search/filtering later)
router.get('/', pharmaController.getAllMedicines); 
// GET a single medicine
router.get('/:pharmaId', pharmaController.getMedicineById);
// POST create a new medicine
router.post('/', pharmaController.createMedicine); 
// PUT update a medicine
router.put('/:pharmaId', pharmaController.updateMedicine);
// DELETE a medicine
router.delete('/:pharmaId', pharmaController.deleteMedicine);

module.exports = router; 
