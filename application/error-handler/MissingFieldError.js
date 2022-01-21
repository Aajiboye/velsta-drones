class MissingFieldError extends Error {
  constructor(requiredFields) {
    super(`${requiredFields.join(', ')} field(s) are required`);
    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name.toUpperCase();
    this.data = {};

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);
    // you may also assign additional properties to your error
  }
}

module.exports = MissingFieldError;
