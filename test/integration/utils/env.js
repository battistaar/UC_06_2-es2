const mongoose = require('mongoose');

module.exports.connectMongo = () => {
    return mongoose.connect('mongodb://localhost:27017/its_todos_test', {useNewUrlParser: true})
        .then(() => {
            console.log('connected to db');
        });
}