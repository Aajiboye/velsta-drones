const logger = require('../utils/logger');
const MissingFieldError = require('../error-handler/MissingFieldError');
const response = require('../utils/responseAdapter'); // response decorator utility

const requiredFieldValidator = (requiredFields) => {
  
  return async (req, res, next) => {
    const correlationID = req.header('x-correlation-id');
try {
   // if no field was entered
   if (req.body.length === 0) {
    logger.debug(`${correlationID}: Required Fields Validation failed`);
    throw new MissingFieldError(requiredFields);
  }

  // check for expected fields
  const enteredFields = Object.keys(req.body);
  requiredFields.forEach((field) => {
    if (!enteredFields.includes(field) || req.body[field] === '') {
      logger.debug(`${correlationID}: Required Fields Validation failed`);
      throw new MissingFieldError(requiredFields);
    }
  });

  next()
} catch (err) {
  logger.debug(`${correlationID}: ${err}`);
      const message = err.message || 'Something Failed';
      const error = {
        data: err.data || {},
        name: err.name || 'UnknownError',
      };
      return res.json(response.error(error, message));

}
   
}
}

module.exports = {
  requiredFieldValidator,
}