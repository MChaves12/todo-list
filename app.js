require('dotenv/config');
const express = require('express');
const app = express();

//DB
require('./db');

//Config

//Routes

//Erros
app.use((req, res, next) => {
    res.status(404).json('Page Not Found');
});
require('./error-handling')(app);


module.exports = app;