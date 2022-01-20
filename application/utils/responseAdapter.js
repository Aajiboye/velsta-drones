const responsetemplate = require('../config/responsetemplates/templatedata');

module.exports = {
  responsetemplate, // TODO: load from yml and pass to this section
  success(data = {}, message = '', statuscode = 200) {
    const response = {
      statuscode,
      data,
      message,
    };
    return response;
  },
  error: (error, message = '', statuscode = 400) => {
    const response = {
      statuscode,
      error,
      message,
    };
    return response;
  },

};
