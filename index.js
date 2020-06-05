const mongoose = require('mongoose');
const app = require('./src/app');

mongoose.connect('mongodb://localhost:27017/its_todos', {useNewUrlParser: true}, (err => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Connected to mongodb');
    app.listen(3000, () => console.log('app listening on port: 3000'));
}));
mongoose.set('debug', true);