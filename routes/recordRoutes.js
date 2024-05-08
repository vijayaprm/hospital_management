const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

// GET all records (potentially with filtering/search)
router.get('/', recordController.getAllRecords);
// GET a record by ID
router.get('/:recordId', recordController.getRecordById);
// POST create a new record
router.post('/', recordController.createRecord);
// PUT update a record
router.put('/:recordId', recordController.updateRecord);
// DELETE a record
router.delete('/:recordId', recordController.deleteRecord);

module.exports = router;
