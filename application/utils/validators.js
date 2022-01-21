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
  if (value < boundaries[0] || value > boundaries[1]) {
    logger.debug(`${correlationID}: Invalid data for value. Value cannot be less than ${boundaries[0]} and cannot be greater than ${boundaries[1]}`);

    throw new Error(`Invalid data for value. Value cannot be less than ${boundaries[0]} and cannot be greater than ${boundaries[1]}`);
  }
};

exports.validateMedicalItems = async (medicalItems, correlationID) => {
  const validate= (item)=> {
    const { name, code } = item;

    if (!name || !code) {
      logger.debug(`${correlationID}: Invalid medical item name`);
      throw new Error('Invalid medical item name. Allowed only letters, numbers, - and _');
    }
    const regexStrName = /^[0-9A-Za-z\s-_]+$/;
    if (!name.match(regexStrName)) {
      logger.debug(`${correlationID}: Validation failed`);
      throw new Error(`Invalid medical item name '${name}'. Allowed only letters, numbers, - and _`);
    }
    const regexStrCode = /^[0-9A-Z\s_]+$/;
    if (!code.toString().match(regexStrCode)) {
      logger.debug(`${correlationID}: Code Validation failed`);
      throw new Error(`Invalid medical item code ${code}. Allowed upper-case letters, underscore and numbers);`);
    }
  }
  
  medicalItems.forEach(item => validate(item));
  
};