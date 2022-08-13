const responseTypes = require("../server/responseTypes");

const send400 = (error, response) => {
  response.status(400).send({
    type: responseTypes.error,
    message:
      typeof error === "string"
        ? error
        : error.message
        ? error.message
        : error.details[0].message,
    data: null,
    status: 400,
  });
};

module.exports = send400;
