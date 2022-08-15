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
      upper: { type: Number, required: true },
      lower: { type: Number, required: true },
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
      upper: Joi.number().required(),
      lower: Joi.number().required(),
    }).required(),
  });
  return Schema.validate(data);
};

module.exports.validateAddBloodPressure = validateAddBloodPressure;
module.exports.BloodPressure = BloodPressure;
