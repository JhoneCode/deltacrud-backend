const mongoose = require("mongoose");
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const AlumnSchema = new mongoose.Schema({
  name: String,
  address: String,
  imageName: String,
  imageSize: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

AlumnSchema.pre("save", function() {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

const s3 = new aws.S3();

AlumnSchema.pre("updateOne", async function() {
  if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: this.key
      })
      .promise()
      .then(response => {
        console.log(response.status);
      })
      .catch(response => {
        console.log(response.status);
      });
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
    );
  }
});

AlumnSchema.pre("remove", async function() {
  if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: this.key
      })
      .promise()
      .then(response => {
        console.log(response.status);
      })
      .catch(response => {
        console.log(response.status);
      });
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
    );
  }
});



module.exports = mongoose.model("alumns", AlumnSchema);