/* eslint-disable no-unreachable */
const logger = require('../utils/logger');
const responseDecorator = require('../utils/responseAdapter');

module.exports = async (req, res, next) => {
  // Get token from header
  const apiKey = req.header('x-api-key');
  const correlationID = req.header('x-correlation-id');
  logger.trace(`>>>> Enter API Access Authentication ${correlationID}`);
  // Check if not token
  if (!apiKey) {
    logger.debug(`No api key found in request ${correlationID}`);
    return res.json(responseDecorator.error({}, responseDecorator.responsetemplate.NOAPI, 401));
  }
  const tokens = process.env.ACTIVETOKENS.split(',');
  if (tokens.includes(apiKey)) {
    logger.trace(`API key available ${correlationID}`);
    return next();
  }
  logger.debug(`Unauthorized Access, access key might have been deactivated ${correlationID}`);
  return res.json(responseDecorator.error({}, responseDecorator.responsetemplate.NOACCESS, 501));
};
