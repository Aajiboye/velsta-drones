/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const counterSchema = new Schema(
  {
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
  },
);

counterSchema.index({ _id: 1, seq: 1 }, { unique: true });

const counterModel = mongoose.model('counter', counterSchema);

const autoIncrementModelID = function (modelName, field, doc, next, prefix) {
  counterModel.findByIdAndUpdate( // ** Method call begins **
    modelName, // The ID to find for in counters model
    { $inc: { seq: 1 } }, // The update
    { new: true, upsert: true }, // The options
    (error, counter) => { // The callback
      if (error) return next(error);
      const document = doc;
      document[field] = prefix + (counter.seq + 10000000);
      next();
      return true;
    },
  ); // ** Method call ends **
};

module.exports = autoIncrementModelID;
