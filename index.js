require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
const express = require('express');
const config = process.env;


const app = express();


AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});

const s3 = new AWS.S3();

const filePath = "./testFile.txt";

const params = {
    Bucket: config.bucketName,
};

const deleteParams = {
    Bucket: config.bucketName,
    Key: '1.txt'
};

const uploadParams = {
    Bucket: config.bucketName,
    Body: fs.createReadStream(filePath),
    Key: '1.txt'
};


const listObjects = s3.listObjects(params).promise();

// const uploadObject = s3.upload(uploadParams).promise()

// const deleteObj = s3.deleteObject(deleteParams).promise()


listObjects.then((res) => console.log(res));


app.listen(config.PORT, () => console.log(`Server started on port: ${config.PORT}`))
