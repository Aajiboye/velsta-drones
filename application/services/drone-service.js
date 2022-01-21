// Business logic comes in here
const Drone = require('../models/Drone.model'); // import drone model
const logger = require('../utils/logger'); // logger
function getFuncName() {
  return getFuncName.caller.name;
}
// data processing and exchange layer between server and db.
const register = async (droneObj, correlationID) => {
  const newdrone = new Drone(droneObj);
  await newdrone.save();
  logger.trace(`${correlationID}: <<<< Exiting ${getFuncName()} Service`);
  const response = {};
  response.data = newdrone;
  response.message = 'Drone added successfully';
  response.success = true;
  return response;
};

const update = async (droneID, updateObj, correlationID) => {
  try {
    const updatedrone = await Drone.findOneAndUpdate(
      { _id: droneID }, updateObj, { new: true },
    );
    logger.trace(`${correlationID}: <<<< Exiting ${getFuncName()} Service`);
    const response = {};
    response.data = updatedrone;
    response.message = 'Drone updated successfully';
    response.success = true;
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

// delete drone
const deleteDrone = async (droneID, deleteType, correlationID) => {
  try {
    let message = 'Drone deleted successfully'
    if (deleteType === 'HARD') {
      await Drone.findOneAndDelete(
      { _id: droneID }
    );}
    else {
      await Drone.findOneAndUpdate(
        { _id: droneID },{deleted: true}
      );
      message = 'Drone added to recycle bin'
    }
    
    logger.trace(`${correlationID}: <<<< Exiting ${getFuncName()} Service`);
    const response = {};
    response.data = {};
    response.message = message;
    response.success = true;
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

// get all drones
const allDrones = async (correlationID) => {
  try {
    const drones = await Drone.find();
    logger.trace(`${correlationID}: <<<< Exiting ${getFuncName()} Service`);
    const response = {};
    response.data = drones;
    response.message = 'Drones retrieved successfully';
    response.success = true;
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

// get single drone
const getDrone = async (droneid, correlationID) => {
  try {
    const drone = await Drone.findOne({ _id: droneid });
    logger.trace(`${correlationID}: <<<< Exiting ${getFuncName()} Service`);
    const response = {};
    response.data = drone || {};
    response.message = 'Drone retrieved successfully';
    response.success = true;
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};


module.exports = {
  register,
  update,
  deleteDrone,
  allDrones,
  getDrone,
}