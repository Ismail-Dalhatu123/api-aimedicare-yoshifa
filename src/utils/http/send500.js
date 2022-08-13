const responseTypes = require("../server/responseTypes");

const send500 = (error, response) => {
  response.status(500).send({
    type: responseTypes.error,
    message:
      typeof error === "string"
        ? error
        : error.message
        ? error.message
        : error.details[0].message,
    data: null,
    status: 500,
  });
};

module.exports = send500;
