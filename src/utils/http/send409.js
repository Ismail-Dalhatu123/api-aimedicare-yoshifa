const responseTypes = require("../server/responseTypes");

const send409 = (error, response) => {
  response.status(409).send({
    type: responseTypes.error,
    message: typeof error === "string" ? error : error.details[0].message,
    data: null,
    status: 409,
  });
};

module.exports = send409;
