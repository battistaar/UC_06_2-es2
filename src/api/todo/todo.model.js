const Todo = require('./todo.schema');
const NotFoundError = require('../../lib/NotFoundError');

module.exports.create = (todoData) => {
    todoData.completed = false;
    return Todo.create(todoData);
}

module.exports.list = (showCompleted) => {
    if (showCompleted) {
        return Todo.find();
    } else {
        return Todo.find({completed: false});
    }
}

module.exports.setCompleted = (todoId, completed) => {
    return Todo.findById(todoId)
        .then(todo => {
            if (!todo) {
                throw new NotFoundError();
            } else {
                todo.completed = completed;
                return todo.save();
            }
        })
        .catch(err => {
            if (err.name === 'CastError') {
                throw new NotFoundError();
            } else {
                throw err;
            }
        });
}