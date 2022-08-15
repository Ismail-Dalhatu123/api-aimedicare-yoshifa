const { validatePlayer, Player } = require("../models/Players");
const { upload, saveFile } = require("../s3/s3");
const FILE_EXTENTIONS = require("../utils/fileExtentions");
const send200 = require("../utils/http/send200");
const send201 = require("../utils/http/send201");
const send400 = require("../utils/http/send400");
const send403 = require("../utils/http/send403");
const send404 = require("../utils/http/send404");
const logger = require("../utils/logger");
const routes = require("../utils/server/routes");

const PlayerRouter = require("express").Router();

PlayerRouter.get(routes.baseUrl, async (request, response) => {
  try {
    const players = await Player.find();
    send200(response, "Get all players", { players });
  } catch (error) {
    logger(error, response);
  }
});

PlayerRouter.get(routes.getById, async (request, response) => {
  try {
    const player = await Player.findOne({ id: request.params.id });
    if (!player) return send404("Player not found!", response);
    send200(response, `Get all player with id: ${request.params.id}`, {
      player,
    });
  } catch (error) {
    logger(error, response);
  }
});

PlayerRouter.post(
  routes.baseUrl,
  [upload.single("image")],
  async (request, response) => {
    try {
      if (!request.file) return send400("Please select an Image", response);
      const fileUpload = await saveFile(request.file, FILE_EXTENTIONS.IMAGES);
      if (fileUpload.error) return send400(fileUpload.error.message, response);
      const { error, value } = validatePlayer(request.body);
      if (error) return send400(error, response);
      const isRegistered = await Player.findOne({ id: value.id });
      if (isRegistered) return send403("ID already registered!", response);
      const account = new Player({
        ...value,
        image: fileUpload.result.Key,
        gender: value.gender.toLowerCase(),
      });
      account.save();
      send201(response, "Account Created!", { account });
    } catch (error) {
      logger(error, response);
    }
  }
);

module.exports = PlayerRouter;
