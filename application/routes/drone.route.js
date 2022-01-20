const express = require('express');

const router = express.Router();
const droneController = require('../controllers/drone-management');

router.post('/register', droneController.registerDrone);
router.put('/', droneController.updateDroneProfile);
router.delete('/', droneController.deleteDrone);
router.get('/all', droneController.getAllDrones);
router.get('/', droneController.getSingleDrones);
router.put('/state/', droneController.changeDroneState);

module.exports = router;
