require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const upload = require("multer")({ dest: "./documents/" });
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME } = process.env;

const s3 = new S3({
  //   region,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename.includes(".")
      ? file.filename
      : file.filename +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1],
  };

  return s3.upload(uploadParams).promise();
}
module.exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: AWS_BUCKET_NAME,
  };

  return s3.getObject(downloadParams).createReadStream();
}

const saveFile = async (file, allowdEx) => {
  try {
    if (!allowdEx.includes(file.mimetype))
      return { error: { message: "Invalid File Extension" }, result: null };
    const result = await uploadFile(file);
    unlinkFile(file.path);
    return { result, error: null };
  } catch (error) {
    console.log(error);
    return { result: null, error };
  }
};

module.exports.getFileStream = getFileStream;
module.exports.upload = upload;
module.exports.saveFile = saveFile;
module.exports.unlinkFile = unlinkFile;
