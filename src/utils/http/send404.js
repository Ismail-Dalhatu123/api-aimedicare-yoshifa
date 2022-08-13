const responseTypes = require("../server/responseTypes");

const send404 = (error, response) => {
  response.status(404).send({
    type: responseTypes.error,
    message: typeof error === "string" ? error : error.details[0].message,
    data: null,
    status: 404,
  });
};

module.exports = send404;
