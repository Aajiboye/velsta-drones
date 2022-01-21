// this models drone dispatch
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const autoIncrementModelID = require('./Counter.model');
const {BATTERYSTATES} = require('../config');

const { Schema } = mongoose;
const BatteryAudit = mongoose.Schema({
  drone: {
    type: Schema.Types.ObjectId,
    ref: 'drone',
  },
  batteryLevel: Number,
  batteryStatus: {
    type: String,
    enum: BATTERYSTATES,
    default: 'OKAY'
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
BatteryAudit.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID('applicationCount', 'dispatchID', this, next, 'DSCP');
});
BatteryAudit.pre('find', function () {
  this.where({ deleted: false });
  this.sort({ createdAt: -1 });
});

module.exports = mongoose.model('battery-audit', BatteryAudit);
