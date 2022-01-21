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
  DRONEMODELS: {
    LIGHTWEIGHT: 100, 
    MIDDLEWEIGHT: 250, 
    CRUISERWEIGHT: 400, 
    HEAVYWEIGHT: 500
  },
  DRONESTATES: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'],
};
