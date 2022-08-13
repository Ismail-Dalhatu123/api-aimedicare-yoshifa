const envs = require("../utils/envs");

require("dotenv").config();
const { DBDEVURL, DBPRODURL, DBPTESTURL, ENV } = process.env;

module.exports = () =>
  ENV === envs.DEVELOPMENT
    ? DBDEVURL
    : ENV === envs.TEST
    ? DBPTESTURL
    : DBPRODURL;
