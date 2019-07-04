require('dotenv').config();
const express = require('express');
const config = process.env;
const router = require('./routes');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();

app.use(bodyParser.json());
app.use(fileUpload());
app.use(router);
app.use((err, req, res, next) =>{
    if (err) {
        res.status(400).send('Something went wrong');
    }
    next();
});

app.listen(config.PORT, () => console.log(`Server started on port: ${config.PORT}`));
