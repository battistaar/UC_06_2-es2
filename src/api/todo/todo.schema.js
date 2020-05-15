const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    title: String,
    dueDate: Date,
    completed: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);