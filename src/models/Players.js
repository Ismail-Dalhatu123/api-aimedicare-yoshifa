const Mongoose = require("mongoose");
const Joi = require("joi");

const Player = Mongoose.model(
  "Players",
  new Mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    expiry: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    age: {
      type: Number,
      default: 0,
    },
  })
);

const validatePlayer = (data) => {
  const Schema = Joi.object({
    id: Joi.number().required(),
    gender: Joi.string()
      .required()
      .allow(...["Male", "male", "Female", "female"]),
    phoneNumber: Joi.string().required(),
    fullname: Joi.string().required(),
    expiry: Joi.string().required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
    age: Joi.number().required(),
  });
  return Schema.validate(data);
};

module.exports.validatePlayer = validatePlayer;
module.exports.Player = Player;
