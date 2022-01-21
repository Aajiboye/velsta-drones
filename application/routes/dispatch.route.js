const express = require('express');

const router = express.Router();
const dispatchController = require('../controllers/dispatch-controller');
const {requiredFieldValidator} = require('../middleware/validators');
router.post('/load', requiredFieldValidator(['droneid', 'medicationItems']), dispatchController.loadDrone);
router.get('/items', dispatchController.getLoadedItems);

module.exports = router;
