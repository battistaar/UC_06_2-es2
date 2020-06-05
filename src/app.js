const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const routes = require('./api/router');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandlers = require('./errors');



app.use(cors());
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use('/api', morgan('tiny'));
app.use('/api', routes);

app.use(errorHandlers);

module.exports = app;