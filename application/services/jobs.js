/* eslint-disable no-underscore-dangle */
const schedule = require('node-cron');
const Drone = require('../models/Drone.model');
const DroneBatteryAudit = require('../models/DroneBatteryAudit.model');
const logger = require('../utils/logger');
// const pnScehuler = require('../utils/pn');

const runRoutine = async () => {
  try {
    const allDrones = await Drone.find({});
    console.log(allDrones)
    allDrones.forEach(async (drone) => {
      const droneObj = {
        drone: drone._id,
        batteryLevel: drone.batteryCapacity,
      }
      if (drone.batteryCapacity < 25) droneObj.batteryStatus = 'LOW';
      const newAuditObj = new DroneBatteryAudit(droneObj);
      await newAuditObj.save()
      console.log(newAuditObj)
    });
  } catch (err) {
    logger.error(`<<<< Job failed due tols ${err}`);
  }
};


exports.job = async () => {
  // this runs every 5 HR '0 */5 * * *'
  schedule.schedule('0 */5 * * *', async () => {
    runRoutine();
  });
};
