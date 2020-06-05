const todoModel = require('./todo.model');

module.exports.list = (req, res, next) => {
    let showCompleted = false;
    if (req.query.showCompleted) {
        showCompleted = req.query.showCompleted.toLowerCase() === 'true';
    }
    todoModel.list(showCompleted)
        .then(todos => {
            res.json(todos);
        })
        .catch(next);
}

module.exports.create = (req, res, next) => {
    const todoData = req.body;
    todoModel.create(todoData)
        .then(todo => {
            res.status(201);
            res.json(todo);
        })
        .catch(next);
}

module.exports.check = (req, res, next) => {
    todoModel.setCompleted(req.params.id, true)
        .then(todo => {
            console.log(todo);
            res.json(todo);
        })
        .catch(next);
}

module.exports.uncheck = (req, res, next) => {
    todoModel.setCompleted(req.params.id, false)
        .then(todo => {
            res.json(todo);
        })
        .catch(next);
}

//oppure
module.exports.setCompleted = (completed) => {
    return (req, res, next) => {
        todoModel.setCompleted(req.params.id, completed)
            .then(todo => {
                res.json(todo);
            })
            .catch(next);
    }
}