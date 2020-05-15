const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
});

module.exports = mongoose.model('Todo', TodoSchema);