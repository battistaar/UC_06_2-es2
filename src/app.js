const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const routes = require('./api/router');

//connessione a mongo

app.use(express.static(path.join(__dirname,'public')));
// body parser

app.set('view engine', 'ejs');
app.use('/api', morgan('tiny'));
app.use('/api', routes);

// erro handling

module.exports = app;