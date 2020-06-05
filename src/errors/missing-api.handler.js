module.exports = (req, res, next) => {
    res.status(404);
    res.send('Missing API');
}