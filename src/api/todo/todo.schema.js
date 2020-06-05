const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: String,
    dueDate: Date,
    completed: {type: Boolean, default: false}
}, {
    toJSON: {
        virtuals: true
    }
});

TodoSchema.virtual('expired')
    .get(function() {
        return !this.completed && this.dueDate < new Date();
    });

module.exports = mongoose.model('Todo', TodoSchema);