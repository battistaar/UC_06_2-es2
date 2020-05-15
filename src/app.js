const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const routes = require('./api/router');
const cors = require('cors');
//connessione a mongo

app.use(cors());
// body parser

app.set('view engine', 'ejs');
app.use('/api', morgan('tiny'));
app.use('/api', routes);

// error handling

module.exports = app;