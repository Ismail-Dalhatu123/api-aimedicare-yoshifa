const responseTypes = require("../server/responseTypes");

const send401 = (error, response) => {
  response.status(401).send({
    type: responseTypes.error,
    message: typeof error === "string" ? error : error.details[0].message,
    data: null,
    status: 401,
  });
};

module.exports = send401;
