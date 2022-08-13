const responseTypes = require("../server/responseTypes");

const send200 = (response, message, data) => {
  response.status(200).send({
    type: responseTypes.success,
    message,
    data,
    status: 200,
  });
};

module.exports = send200;
