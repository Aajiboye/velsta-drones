/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('../index');

const db = config.MONGODB_URI;
const logger = require('../../utils/logger');

const connectDB = async (callback) => {
  try {
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
  useUnifiedTopology: true,
      });

    logger.trace('MongoDB Connected....');
    console.log('MongoDB Connected...');
    callback();
  } catch (err) {
    logger.debug(`MongoDB connection failed due to: ${err.message}`);
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
