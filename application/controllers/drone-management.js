// controller: Handles api requests and responses
const response = require('../utils/responseAdapter'); // response decorator utility
const logger = require('../utils/logger'); // logger
const droneManagementService = require('../services/drone-service');
const {enumTypesValidator, limitsValidator} = require('../utils/validators');
const {DRONEMODELS} = require('../config')
function getFuncName() {
  return getFuncName.caller.name;
}
// drone management flow
// this is where drone is managed

const registerDrone = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Entered ${getFuncName()} controller -->>>>>>`);
    // build drone data
    const {model, weightLimit, batteryCapacity} = req.body;
    const droneData = {
      model,
      weightLimit,
      batteryCapacity,
    };
    await enumTypesValidator(model.toUpperCase(), Object.keys(DRONEMODELS), correlationID);
    await limitsValidator([1, DRONEMODELS[model.toUpperCase()]], weightLimit, correlationID);
    await limitsValidator([0,100], batteryCapacity, correlationID);

    const responseData = await droneManagementService.register(droneData, correlationID);

    logger.trace(`${correlationID}: ${responseData.message}`);

    return res.json(response.success(responseData.data, responseData.message));
  } catch (err) {
    logger.debug(`${correlationID}: ${err}`);
      const message = err.message || 'Something Failed';
      const error = {
        data: err.data || {},
        name: err.name || 'UnknownError',
      };
      return res.json(response.error(error, message));
  }
};

// should be able to update drone information
const updateDroneProfile = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Entered ${getFuncName()} controller -->>>>>>`);
    // build drone data
    const { model, weightLimit, batteryCapacity } = req.body;
    const updateData = {};
    if (model){
      await enumTypesValidator(model.toUpperCase(), Object.keys(DRONEMODELS), correlationID);
      updateData.model = model;
    } 
    if (weightLimit){
      await limitsValidator([1,DRONEMODELS[model.toUpperCase()]], weightLimit, correlationID);
      updateData.weightLimit = weightLimit;
    } 
    if (batteryCapacity){
      await limitsValidator([0,100], batteryCapacity, correlationID);
      updateData.batteryCapacity = batteryCapacity;
    } 
    const { droneid } = req.query;
    const responseData = await droneManagementService.update(droneid, updateData, correlationID);

    logger.trace(`${correlationID}: ${responseData.message}`);

    return res.json(response.success(responseData.data, responseData.message));
  } catch (err) {
    logger.debug(`${correlationID}: ${err}`);
      const message = err.message || 'Something Failed';
      const error = {
        data: err.data || {},
        name: err.name || 'UnknownError',
      };
      return res.json(response.error(error, message));
  }
};

// should return all registered drones
const getAllDrones = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Entered ${getFuncName()} controller -->>>>>>`);

    const responseData = await droneManagementService.allDrones(correlationID);

    logger.trace(`${correlationID}: ${responseData.message}`);

    return res.json(response.success(responseData.data, responseData.message));
  } catch (err) {
    logger.debug(`${correlationID}: ${err}`);
      const message = err.message || 'Something Failed';
      const error = {
        data: err.data || {},
        name: err.name || 'UnknownError',
      };
      return res.json(response.error(error, message));
  }
};

// should return a single drone
const getSingleDrones = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Entered ${getFuncName()} controller -->>>>>>`);
    const {droneid} = req.query;
    const responseData = await droneManagementService.getDrone(droneid, correlationID);
    logger.trace(`${correlationID}: ${responseData.message}`);

    return res.json(response.success(responseData.data, responseData.message));
  } catch (err) {
    logger.debug(`${correlationID}: ${err}`);
      const message = err.message || 'Something Failed';
      const error = {
        data: err.data || {},
        name: err.name || 'UnknownError',
      };
      return res.json(response.error(error, message));
  }
};

// should be able to toggle between drone states
const changeDroneState = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Entered ${getFuncName()} controller -->>>>>>`);
    const {droneID, state} = req.query;
    const responseData = await droneManagementService.changeDroneState(droneID, state, correlationID);
    logger.trace(`${correlationID}: ${responseData.message}`);

    return res.json(response.success(responseData.data, responseData.message));
  } catch (err) {
    logger.debug(`${correlationID}: ${err}`);
      const message = err.message || 'Something Failed';
      const error = {
        data: err.data || {},
        name: err.name || 'UnknownError',
      };
      return res.json(response.error(error, message));
  }
};

// delete drone
const deleteDrone = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Entered ${getFuncName()} controller -->>>>>>`);
    const {droneid, deleteType} = req.query;
    const responseData = await droneManagementService.deleteDrone(droneid, deleteType, correlationID);
    logger.trace(`${correlationID}: ${responseData.message}`);

    return res.json(response.success(responseData.data, responseData.message));
  } catch (err) {
    logger.debug(`${correlationID}: ${err}`);
      const message = err.message || 'Something Failed';
      const error = {
        data: err.data || {},
        name: err.name || 'UnknownError',
      };
      return res.json(response.error(error, message));
  }
};
module.exports = {
  registerDrone,
  updateDroneProfile,
  getAllDrones,
  getSingleDrones,
  changeDroneState,
  deleteDrone,
}