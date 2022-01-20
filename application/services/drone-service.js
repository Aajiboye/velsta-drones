// Business logic comes in here
const Drone = require('../models/Drone.model'); // import location model
const logger = require('../utils/logger'); // logger
function getFuncName() {
  return getFuncName.caller.name;
}
// data processing and exchange layer between server and db.
const register = async (droneObj, correlationID) => {
  const newLocation = new Drone(droneObj);
  await newLocation.save();
  logger.trace(`${correlationID}: <<<< Exiting locationManagementService.add()`);
  const response = {};
  response.data = newLocation;
  response.message = 'Drone added successfully';
  response.success = true;
  return response;
};

const update = async (droneID, updateObj, correlationID) => {
  try {
    const updateLocation = await Drone.findOneAndUpdate(
      { _id: droneID }, updateObj, { new: true },
    );
    logger.trace(`${correlationID}: <<<< Exiting ${getFuncName()} Service`);
    const response = {};
    response.data = updateLocation;
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
    if (deleteType === 'HARD') {
      await Drone.findOneAndDelete(
      { _id: droneID }
    );}
    else {
      await Drone.findOneAndUpdate(
        { _id: droneID },{deleted: true}
      );
    }
    
    logger.trace(`${correlationID}: <<<< Exiting ${getFuncName()} Service`);
    const response = {};
    response.data = {};
    response.message = 'Drone added to recycle bin';
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

// get single location
const getDrone = async (locationID, correlationID) => {
  try {
    const location = await Drone.findOne({ _id: locationID });
    logger.trace(`${correlationID}: <<<< Exiting ${getFuncName()} Service`);
    const response = {};
    response.data = location;
    response.message = 'Location retrieved successfully';
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