/* eslint-disable camelcase */
const logger = require('./logger');
const { MissingFieldError } = require('../error-handler');

exports.enumTypesValidator = async (inputValue, enumValues, correlationID) => {
  if (!inputValue) {
    logger.debug(`${correlationID}: Required Fields Validation failed`);
    throw new MissingFieldError([inputValue]);
  }
  const inputValueFormatted = inputValue.toUpperCase();
  if (!enumValues.includes(inputValueFormatted)) {
    throw new Error(`Invalid entry for enum values ${enumValues}`);
  }
};

exports.limitsValidator = async (boundaries, value, correlationID) => {
  if (value < boundaries[0] || value > boundaries[1] ){
    logger.debug(`${correlationID}: Invalid data for value. Value cannot be less than ${boundaries[0]} and cannot be greater than ${boundaries[1]}`);

    throw new Error(`Invalid data for value. Value cannot be less than ${boundaries[0]} and cannot be greater than ${boundaries[1]}`);
}
};
