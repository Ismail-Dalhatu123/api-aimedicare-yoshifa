const { Player } = require("../models/Players");
const {
  BloodOxygen,
  validateAddBloodOxygen,
} = require("../models/vitals/BloodOxygen");
const {
  BloodPressure,
  validateAddBloodPressure,
} = require("../models/vitals/BloodPressure");
const {
  BodyCallories,
  validateAddBodyCallories,
} = require("../models/vitals/Callories");
const {
  validateAddHeartRate,
  HeartRate,
} = require("../models/vitals/HeartRate");
const {
  SportData,
  validateAddSportData,
} = require("../models/vitals/SportData");
const { getFromToQuery } = require("../utils/funcs");
const send200 = require("../utils/http/send200");
const send201 = require("../utils/http/send201");
const send400 = require("../utils/http/send400");
const send404 = require("../utils/http/send404");
const logger = require("../utils/logger");

const VitalsRouter = require("express").Router();

VitalsRouter.post("/heart-rate/add", async (request, response) => {
  try {
    const { error, value } = validateAddHeartRate(request.body);
    if (error) return send400(error, response);
    const player = await Player.findOne({ id: value.playerId }).select("_id");
    if (!player) return send404("Player not found!", response);
    const created = new HeartRate(value);
    created.save();
    send201(response, "Saved", { created });
  } catch (error) {
    logger(error, response);
  }
});
VitalsRouter.get("/:playerId/heart-rate", async (request, response) => {
  try {
    const player = await Player.findOne({ id: request.params.playerId });
    if (!player) return send404("Player not found!", response);
    const readings = await HeartRate.find({
      playerId: request.params.playerId,
      ...getFromToQuery(request),
    });
    send200(response, "Get player heart rate", { readings, player });
  } catch (error) {
    logger(error, response);
  }
});

VitalsRouter.post("/blood-pressure/add", async (request, response) => {
  try {
    const { error, value } = validateAddBloodPressure(request.body);
    if (error) return send400(error, response);
    const player = await Player.findOne({ id: value.playerId }).select("_id");
    if (!player) return send404("Player not found!", response);
    const created = new BloodPressure(value);
    created.save();
    send201(response, "Saved", { created });
  } catch (error) {
    logger(error, response);
  }
});

VitalsRouter.post("/body-callories/add", async (request, response) => {
  try {
    const { error, value } = validateAddBodyCallories(request.body);
    if (error) return send400(error, response);
    const player = await Player.findOne({ id: value.playerId }).select("_id");
    if (!player) return send404("Player not found!", response);
    const created = new BodyCallories(value);
    created.save();
    send201(response, "Saved", { created });
  } catch (error) {
    logger(error, response);
  }
});

VitalsRouter.post("/blood-oxygen/add", async (request, response) => {
  try {
    const { error, value } = validateAddBloodOxygen(request.body);
    if (error) return send400(error, response);
    const player = await Player.findOne({ id: value.playerId }).select("_id");
    if (!player) return send404("Player not found!", response);
    const created = new BloodOxygen(value);
    created.save();
    send201(response, "Saved", { created });
  } catch (error) {
    logger(error, response);
  }
});

VitalsRouter.post("/sport-data/add", async (request, response) => {
  try {
    const { error, value } = validateAddSportData(request.body);
    if (error) return send400(error, response);
    const player = await Player.findOne({ id: value.playerId }).select("_id");
    if (!player) return send404("Player not found!", response);
    const created = new SportData(value);
    created.save();
    send201(response, "Saved", { created });
  } catch (error) {
    logger(error, response);
  }
});

VitalsRouter.get("/:playerId/blood-pressure", async (request, response) => {
  try {
    const player = await Player.findOne({ id: request.params.playerId });
    if (!player) return send404("Player not found!", response);
    const readings = await BloodPressure.find({
      playerId: request.params.playerId,
      ...getFromToQuery(request),
    });
    send200(response, "Get player blood pressure", { readings, player });
  } catch (error) {
    logger(error, response);
  }
});

VitalsRouter.get("/:playerId/body-callories", async (request, response) => {
  try {
    const player = await Player.findOne({ id: request.params.playerId });
    if (!player) return send404("Player not found!", response);
    const readings = await BodyCallories.find({
      playerId: request.params.playerId,
      ...getFromToQuery(request),
    });
    send200(response, "Get player body callories", { readings, player });
  } catch (error) {
    logger(error, response);
  }
});

VitalsRouter.get("/:playerId/sport-data", async (request, response) => {
  try {
    const player = await Player.findOne({ id: request.params.playerId });
    if (!player) return send404("Player not found!", response);
    const readings = await SportData.find({
      playerId: request.params.playerId,
      ...getFromToQuery(request),
    });
    send200(response, "Get player sport data", { readings, player });
  } catch (error) {
    logger(error, response);
  }
});

VitalsRouter.get("/:playerId/blood-oxygen", async (request, response) => {
  try {
    const player = await Player.findOne({ id: request.params.playerId });
    if (!player) return send404("Player not found!", response);
    const readings = await BloodOxygen.find({
      playerId: request.params.playerId,
      ...getFromToQuery(request),
    });
    send200(response, "Get player blood oxygen", { readings, player });
  } catch (error) {
    logger(error, response);
  }
});
module.exports = VitalsRouter;
