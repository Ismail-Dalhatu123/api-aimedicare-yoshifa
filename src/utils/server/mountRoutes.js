const dotenv = require("dotenv");
const routes = require("./routes");
dotenv.config();
const { API_VERSION } = process.env;
const BASE_URL = `/api/v${API_VERSION}`;

module.exports = (app) => {};
