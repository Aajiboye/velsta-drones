// this service manages the dispatch of medications to drones

const Drone = require('../models/Drone.model'); // import drone model
const Dispatch = require('../models/Dispatch.model'); // import dispatch model

const logger = require('../utils/logger'); // logger
function getFuncName() {
  return getFuncName.caller.name;
}
// data processing and exchange layer between server and db.
const load = async (droneid, medicationItems, correlationID) => {
  // get drone so to check if it can be loaded
  const getDrone = await Drone.findOne({_id: droneid});
  // check battery level
  if (getDrone.state !== 'IDLE') throw new Error('Drone currently in use, please try again');
  if (getDrone.batteryLevel < 25) throw new Error('Cannot load this drone due to low battery. Please charge or replace battery');
  // get the weight of items and throw error if net weight is higher than drone max weight
  const itemsWeight = medicationItems.reduce((total, item) => total + item.weight, 0);
  if (itemsWeight > getDrone.weightLimit) throw new Error(`Cannot load this drone due to overload. The maximum allowed load weight is ${getDrone.weightLimit}`);
  console.log(medicationItems)
  const createDispatch = new Dispatch();
  createDispatch.medicationItems = medicationItems; 
  createDispatch.drone = droneid;
  await createDispatch.save();
  // set drone status to loaded
  getDrone.state = 'LOADED';
  getDrone.save();
  logger.trace(`${correlationID}: <<<< Exiting ${getFuncName()} Service`);
  const response = {};
  response.data = createDispatch;
  response.message = 'Drone loaded successfully';
  response.success = true;
  return response;
};

const getLoadedItems = async (droneid, correlationID) => {
  // get drone so to check if it can be loaded
  const getDrone = await Dispatch.findOne({drone: droneid, status: { $ne: 'IDLE' }});
  console.log(getDrone);
  logger.trace(`${correlationID}: <<<< Exiting ${getFuncName()} Service`);
  const response = {};
  response.data = getDrone.medicationItems;
  response.message = 'Drone items retrieved successfully';
  response.success = true;
  return response;
};
module.exports = {
  load,
  getLoadedItems,
}