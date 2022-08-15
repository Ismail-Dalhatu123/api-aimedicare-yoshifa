const Mongoose = require("mongoose");
const Joi = require("joi");

const BloodOxygen = Mongoose.model(
  "BloodOxygens",
  new Mongoose.Schema({
    playerId: {
      type: Number,
      required: true,
    },
    bloodOxygen: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

const validateAddBloodOxygen = (data) => {
  const Schema = Joi.object({
    playerId: Joi.number().required(),
    bloodOxygen: Joi.number().required(),
  });
  return Schema.validate(data);
};

module.exports.validateAddBloodOxygen = validateAddBloodOxygen;
module.exports.BloodOxygen = BloodOxygen;
