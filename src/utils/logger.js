const responseTypes = require("./server/responseTypes");
const fs = require("fs");
const date = new Date();

module.exports = async (
  error,
  response,
  status = 500,
  errMsg = "Internal Server Error!"
) => {
  console.log(error);

  fs.writeFileSync(
    `./logs/${date.getDate()}-${date.getMonth()}-${date.getFullYear()} at ${date.getHours()}-${date.getMinutes()}-${date.getMilliseconds()}.log`,
    errMsg ? errMsg : error.message,
    (err, da) => {
      console.log(err);
      console.log(da);
    }
  );

  if (response)
    response.status(status).send({
      type: responseTypes.error,
      message: errMsg,
      status: status,
      data: null,
    });
};

// % arch -x86_64 pod install
