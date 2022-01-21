// controller: Handles api requests and responses
const response = require('../utils/responseAdapter'); // response decorator utility
const logger = require('../utils/logger'); // logger
const dispatchService = require('../services/dispatch-service');
const {validateMedicalItems} = require('../utils/validators')
function getFuncName() {
  return getFuncName.caller.name;
}
// dispatch controller flow
// this is drone dispatch is managed

const loadDrone = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Entered ${getFuncName()} controller -->>>>>>`);
    // build drone data
    const {droneid, medicationItems} = req.body;
    await validateMedicalItems(medicationItems);
    const responseData = await dispatchService.load(droneid, medicationItems, correlationID);

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

const getLoadedItems = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Entered ${getFuncName()} controller -->>>>>>`);
    // build drone data
    const {droneid} = req.query;
    const responseData = await dispatchService.getLoadedItems(droneid, correlationID);

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
  loadDrone,
  getLoadedItems,
}