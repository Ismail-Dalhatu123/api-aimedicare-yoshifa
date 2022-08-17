const dotenv = require("dotenv");
const PlayerRouter = require("../../routes/Player");
const VitalsRouter = require("../../routes/Vitals");
const { fileStreams } = require("./routes");
const routes = require("./routes");
dotenv.config();
const { API_VERSION } = process.env;
const BASE_URL = `/api/v${API_VERSION}`;

module.exports = (app) => {
  app.use(`${BASE_URL}${routes.players}`, PlayerRouter);
  app.use(`${BASE_URL}${routes.vitals}`, VitalsRouter);
  app.use(`${BASE_URL}${routes.fileStreams.baseUrl}`, fileStreams);
};
