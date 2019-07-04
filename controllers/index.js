const {S3} = require('../libs/AWS');
const config = process.env;

const params = {
    Bucket: config.bucketName,
};

module.exports = {
    getList: async (req, res) => {
        try {
            const data = await S3.listObjects(params).promise();
            let filesList = data.Contents;

            if (req.query && req.query.key) {
                const pattern = req.query.key;
                filesList = filesList.filter((file) => file.Key.includes(pattern));
            }

            if (!filesList || !filesList.length) res.send('No results found');

            res.send(filesList);
        } catch (e) {
            throw new Error(e);
        }
    },

    deleteFile: async (req, res) => {
        try {
            const data = await S3.listObjects(params).promise();
            let filesList = data.Contents;

            if (!req.query.key) {
                return res.status(400).send('File name pattern is required');
            }

            const pattern = req.query.key;
            const deletedNames = [];

            await Promise.all(filesList.map((file) => {
                if (file.Key.includes(pattern)) {
                    const deleteParams = {
                        Bucket: config.bucketName,
                        Key: file.Key
                    };
                    return S3.deleteObject(deleteParams).promise()
                        .then(() => {
                            deletedNames.push(file.Key);
                        })
                        .catch((err) => {
                            console.log(`An error occurred by deleting object`);
                        })
                }
            }));

            res.send([...deletedNames]);
        } catch (e) {
            throw new Error(e);
        }
    },

    uploadFile: async (req, res) => {
        try {
            if (!req.files || !req.files.file) {
                return res.status(400).send('Please provide a file');
            }

            const {file} = req.files;

            const uploadParams = {
                Bucket: config.bucketName,
                Body: file.data,
                Key: file.name
            };

            const result = await S3.upload(uploadParams).promise();
            res.send(`${result.Key} is uploaded`);
        } catch (e) {
            throw new Error(e);
        }
    }
};

