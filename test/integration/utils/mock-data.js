module.exports.simple = {title: 'Test1'};
module.exports.dueDatePast = {title: 'Test2', dueDate: new Date()};
module.exports.dueDatePastCompleted = {title: 'Test4', dueDate: new Date(), completed: true};
module.exports.dueDateFuture = {title: 'Test3', dueDate: new Date('2030-01-01')};
module.exports.dueDateFutureCompleted = {title: 'Test6', dueDate: new Date('2030-01-01'), completed: true};
module.exports.completed = {title: 'Test5', completed: true};