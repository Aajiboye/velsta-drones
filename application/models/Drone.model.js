/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const autoIncrementModelID = require('./Counter.model');
const {DRONEMODELS, DRONESTATES} = require('../config');
const DroneSchema = mongoose.Schema({
  model: {
    type: String,
    enum: Object.keys(DRONEMODELS),
    uppercase: true,
  },
  weightLimit: {
    type: Number,
    max: 500,
  },
  serialNo: String,
  batteryCapacity: {
    type: Number,
    max: 100
  },
  state: {
    type: String,
    enum: DRONESTATES,
    default: 'IDLE'
  },
  deleted:{
    type: Boolean,
    default:false,
    select: false,
},
}, 
{
  timestamps: true,
});
DroneSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID('applicationCount', 'serialNo', this, next, 'drn');
});
DroneSchema.pre('find', function () {
  this.where({ deleted: false });
  this.sort({ createdAt: -1 });
});

module.exports = mongoose.model('location', DroneSchema);
