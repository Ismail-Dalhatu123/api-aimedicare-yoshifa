// const basicAuth = require("../middlewares/basicAuth");
const { getFileStream } = require("../s3/s3");
const send404 = require("../utils/http/send404");
const logger = require("../utils/logger");

const FileStreams = require("express").Router();

FileStreams.get("/:key", [], async (request, response) => {
  try {
    const { key } = request.params;
    if (!key) return send404("Key is missing", response);
    const stream = getFileStream(key);
    let isError = false;
    stream.on("error", () => (isError = true));
    response.attachment(key);
    if (isError) return logger("something went wrong", response);
    stream.pipe(response);
  } catch (error) {
    logger(error, response);
  }
});

module.exports = FileStreams;
