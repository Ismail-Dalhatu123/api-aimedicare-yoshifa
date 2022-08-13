const responseTypes = require("../server/responseTypes");

const send201 = (response, message, data) => {
  response.status(201).send({
    type: responseTypes.success,
    message,
    data,
    status: 201,
  });
};

module.exports = send201;
