const express = require('express');

const router = express.Router();
const droneController = require('../controllers/drone-management');
const {requiredFieldValidator} = require('../middleware/validators');
router.post('/register', requiredFieldValidator(['model', 'weightLimit', 'batteryCapacity']), droneController.registerDrone);
router.put('/', droneController.updateDroneProfile);
router.delete('/', droneController.deleteDrone);
router.get('/all', droneController.getAllDrones);
router.get('/', droneController.getSingleDrones);
router.put('/state/', droneController.changeDroneState);

module.exports = router;
