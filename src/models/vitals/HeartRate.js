const Mongoose = require("mongoose");
const Joi = require("joi");

const HeartRate = Mongoose.model(
  "HeartRates",
  new Mongoose.Schema({
    playerId: {
      type: Number,
      required: true,
    },
    heartRate: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

const validateAddHeartRate = (data) => {
  const Schema = Joi.object({
    playerId: Joi.number().required(),
    heartRate: Joi.number().required(),
  });
  return Schema.validate(data);
};

module.exports.validateAddHeartRate = validateAddHeartRate;
module.exports.HeartRate = HeartRate;
