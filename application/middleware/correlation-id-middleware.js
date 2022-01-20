const { CORRELATIONID_PREFIX } = require('../config/app/index');
const logger = require('../utils/logger');

// eslint-disable-next-line func-names
module.exports = async function (req, res, next) {
  // Get token from header
  logger.trace('>>>> Entered correlation middleware');
  const correlationID = req.header('x-correlation-id');
  // Check if correlationID isn't sent in the header
  if (!correlationID) {
    logger.debug('No correlation ID');
    const ServiceGeneratedID = CORRELATIONID_PREFIX + Date.now();
    logger.trace(`>>>> Added Correlation ID to request: ${ServiceGeneratedID}`);
    req.headers['x-correlation-id'] = ServiceGeneratedID;
    logger.trace('<<<< Added Correlation ID added. next()');
    next();
  } else {
    logger.trace('<<<< Correlation ID already available. next()');
    next();
  }
};
