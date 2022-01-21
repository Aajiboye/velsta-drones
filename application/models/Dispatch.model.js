// this models drone dispatch
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const autoIncrementModelID = require('./Counter.model');
const {DISPATCHSTATES} = require('../config');

const { Schema } = mongoose;
const DispatchSchema = mongoose.Schema({
  drone: {
    type: Schema.Types.ObjectId,
    ref: 'drone',
  },
  medicationItems: [{
    name: String,
    weight: Number,
    code: {
      type: String,
      unique: true,
    },
    image: String,
  }],
  dispatchID: String,
  status: {
    type: String,
    enum: DISPATCHSTATES,
    default: 'LOADED'
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
DispatchSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID('applicationCount', 'dispatchID', this, next, 'DSCP');
});
DispatchSchema.pre('find', function () {
  this.where({ deleted: false });
  this.sort({ createdAt: -1 });
});

module.exports = mongoose.model('dispatch', DispatchSchema);
