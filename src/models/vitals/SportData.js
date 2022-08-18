const Mongoose = require("mongoose");
const Joi = require("joi");

const SportData = Mongoose.model(
  "SportDatas",
  new Mongoose.Schema({
    playerId: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      default: 0,
    },
    distance: {
      type: Number,
      default: 0,
    },
    Kcal: {
      type: Number,
      default: 0,
    },
    calcType: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

const validateAddSportData = (data) => {
  const Schema = Joi.object({
    playerId: Joi.number().required(),
    step: Joi.number().required(),
    distance: Joi.number().required(),
    Kcal: Joi.number().required(),
    calcType: Joi.number().required(),
  });
  return Schema.validate(data);
};

module.exports.validateAddSportData = validateAddSportData;
module.exports.SportData = SportData;
