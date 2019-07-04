const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});

const S3 = new AWS.S3();

module.exports = {S3};