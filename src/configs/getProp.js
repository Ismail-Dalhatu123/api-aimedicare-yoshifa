require("dotenv").config();
const envs = require("../utils/envs");
const { ENV } = process.env;

module.exports = (dp, tp, pp) =>
  ENV === envs.DEVELOPMENT ? dp : ENV === envs.TEST ? tp : pp;
