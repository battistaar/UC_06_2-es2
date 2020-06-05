const missingAPI = require('./missing-api.handler');
const notFound = require('./not-found.handler');
const internalError = require('./internal.handler');

module.exports = [missingAPI, notFound, internalError];