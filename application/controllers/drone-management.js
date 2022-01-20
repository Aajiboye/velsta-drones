// controller: Handles api requests and responses
const response = require('../utils/responseAdapter'); // response decorator utility
const logger = require('../utils/logger'); // logger

const droneManagementService = require('../services/drone-service');
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
    const droneData = {

    };
    const responseData = await droneManagementService.registerDrone(droneData, correlationID);

    logger.trace(`${correlationID}: ${responseData.message}`);

    return res.json(response.success(responseData.data, responseData.message));
  } catch (err) {
    logger.debug(`${correlationID}: ${err}`);
    const error = {};
    let message = '';
    err.data ? (error.data = err.data) : (error.data = {});
    err.name ? (error.name = err.name) : (error.name = 'UnknownError');
    err.message ? (message = err.message) : (message = 'Something Failed');
    return res.json(response.error(error, message));
  }
};

// should be able to update drone information
const updateDroneProfile = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Entered ${getFuncName()} controller -->>>>>>`);
    // build drone data
    const droneData = {

    };
    const responseData = await droneManagementService.updateDroneProfile(droneData, correlationID);

    logger.trace(`${correlationID}: ${responseData.message}`);

    return res.json(response.success(responseData.data, responseData.message));
  } catch (err) {
    logger.debug(`${correlationID}: ${err}`);
    const error = {};
    let message = '';
    err.data ? (error.data = err.data) : (error.data = {});
    err.name ? (error.name = err.name) : (error.name = 'UnknownError');
    err.message ? (message = err.message) : (message = 'Something Failed');
    return res.json(response.error(error, message));
  }
};

// should return all registered drones
const getAllDrones = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Entered ${getFuncName()} controller -->>>>>>`);

    const responseData = await droneManagementService.getAllDrones(correlationID);

    logger.trace(`${correlationID}: ${responseData.message}`);

    return res.json(response.success(responseData.data, responseData.message));
  } catch (err) {
    logger.debug(`${correlationID}: ${err}`);
    const error = {};
    let message = '';
    err.data ? (error.data = err.data) : (error.data = {});
    err.name ? (error.name = err.name) : (error.name = 'UnknownError');
    err.message ? (message = err.message) : (message = 'Something Failed');
    return res.json(response.error(error, message));
  }
};

// should return a single drone
const getSingleDrones = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Entered ${getFuncName()} controller -->>>>>>`);
    const {droneID} = req.query;
    const responseData = await droneManagementService.getSingleDrone(droneID, correlationID);
    logger.trace(`${correlationID}: ${responseData.message}`);

    return res.json(response.success(responseData.data, responseData.message));
  } catch (err) {
    logger.debug(`${correlationID}: ${err}`);
    const error = {};
    let message = '';
    err.data ? (error.data = err.data) : (error.data = {});
    err.name ? (error.name = err.name) : (error.name = 'UnknownError');
    err.message ? (message = err.message) : (message = 'Something Failed');
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
    const error = {};
    let message = '';
    err.data ? (error.data = err.data) : (error.data = {});
    err.name ? (error.name = err.name) : (error.name = 'UnknownError');
    err.message ? (message = err.message) : (message = 'Something Failed');
    return res.json(response.error(error, message));
  }
};

// delete drone
const deleteDrone = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Entered ${getFuncName()} controller -->>>>>>`);
    const {droneID, deleteType} = req.query;
    const responseData = await droneManagementService.deleteDrone(droneID, deleteType, correlationID);
    logger.trace(`${correlationID}: ${responseData.message}`);

    return res.json(response.success(responseData.data, responseData.message));
  } catch (err) {
    logger.debug(`${correlationID}: ${err}`);
    const error = {};
    let message = '';
    err.data ? (error.data = err.data) : (error.data = {});
    err.name ? (error.name = err.name) : (error.name = 'UnknownError');
    err.message ? (message = err.message) : (message = 'Something Failed');
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