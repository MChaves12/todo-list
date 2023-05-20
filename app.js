require('dotenv/config');
const express = require('express');
const app = express();

//DB
require('./db');

//Config
require('./configs')(app);

//Middlewares
const { isAuthenticated } = require('./middlewares/jwt.middleware');

//Routes
app.use('/', require('./routes/auth.routes'));

app.use('/auth', require('./routes/auth.routes'));
app.use(isAuthenticated);
app.use('/task', require('./routes/todos.routes'));


//Erros
//app.use((req, res, next) => {
   // res.status(404).json('Page Not Found');
//});
require('./error-handling')(app);


module.exports = app;