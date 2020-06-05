const NotFoundError = require('../lib/NotFoundError');

module.exports = (err, req, res, next) => {
    if (err instanceof NotFoundError) {
        res.status(404);
        res.json({message: err.message});
    } else {
        next(err);
    }
}