const Mongoose = require("mongoose");
const Joi = require("joi");

const BodyCallories = Mongoose.model(
  "BodyCallories",
  new Mongoose.Schema({
    playerId: {
      type: Number,
      required: true,
    },
    burnt: {
      type: Number,
      required: true,
    },
    steps: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

const validateAddBodyCallories = (data) => {
  const Schema = Joi.object({
    playerId: Joi.number().required(),
    burnt: Joi.number().required(),
    steps: Joi.number().required(),
    distance: Joi.number().required(),
  });
  return Schema.validate(data);
};

module.exports.validateAddBodyCallories = validateAddBodyCallories;
module.exports.BodyCallories = BodyCallories;
