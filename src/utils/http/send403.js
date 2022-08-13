const responseTypes = require("../server/responseTypes");

const send403 = (error, response) => {
  response.status(403).send({
    type: responseTypes.error,
    message: typeof error === "string" ? error : error.details[0].message,
    data: null,
    status: 403,
  });
};

module.exports = send403;
