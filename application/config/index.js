/* eslint-disable global-require */
module.exports = {
  /**
   *  port
   */
  PORT: require('./port'),
  APP: require('./app'),
  /**
   * Credentials for the AWS Logs
   */
   MONGODB_URI: process.env.MONGODB_URI,
  DRONEMODELS: ['LIGHTWEIGHT', 'MIDDLEWEIGHT', 'CRUISERWEIGHT', 'HEAVYWEIGHT'],
  DRONESTATES: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'],
};
