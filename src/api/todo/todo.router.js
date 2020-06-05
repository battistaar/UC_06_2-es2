const express = require('express');
const router = express.Router();
const todoController = require('./todo.controller');

router.get('/', todoController.list);
router.post('/', todoController.create);
router.patch('/:id/check', todoController.check);
router.patch('/:id/uncheck', todoController.uncheck);
//oppure
// router.patch('/:id/check', todoController.setCompleted(true));
// router.patch('/:id/check', todoController.setCompleted(false));

module.exports = router;