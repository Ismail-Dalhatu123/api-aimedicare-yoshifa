const Mongoose = require("mongoose");
const Joi = require("joi");

const BloodPressure = Mongoose.model(
  "BloodPressures",
  new Mongoose.Schema({
    playerId: {
      type: Number,
      required: true,
    },
    bloodPressure: {
      high: { type: Number, required: true },
      low: { type: Number, required: true },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

const validateAddBloodPressure = (data) => {
  const Schema = Joi.object({
    playerId: Joi.number().required(),
    bloodPressure: Joi.object({
      high: Joi.number().required(),
      low: Joi.number().required(),
    }).required(),
  });
  return Schema.validate(data);
};

module.exports.validateAddBloodPressure = validateAddBloodPressure;
module.exports.BloodPressure = BloodPressure;
