const expect = require('chai').expect;
const envUtils = require('../utils/env');
const Todo = require('../../../src/api/todo/todo.schema');
const app = require('../../../src/app');
const request = require('supertest')(app);
const mocks = require('../utils/mock-data');

describe('Check expired property', () => {
    before(()=> {
        return envUtils.connectMongo();
    })

    it('Dovrebbe tornare expired false se manca dueDate e completed = false', () => {
        return Todo.create(mocks.simple)
            .then(_ => {
                return request
                .get('/api/todos')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            })
            .then(response => {
                return response.body;
            })
            .then(todos => {
                expect(todos[0].expired).to.be.false
            })
            .then(_ => {
                return Todo.remove({});
            });
    })

    it('Dovrebbe tornare expired false se manca dueDate e completed = true', () => {
        return Todo.create(mocks.completed)
            .then(_ => {
                return request
                .get('/api/todos?showCompleted=true')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            })
            .then(response => {
                return response.body;
            })
            .then(todos => {
                expect(todos[0].expired).to.be.false
            })
            .then(_ => {
                return Todo.remove({});
            });
    })

    it('Dovrebbe tornare expired true se dueDate è passata e completed è false', () => {
        return Todo.create(mocks.dueDatePast)
            .then(_ => {
                return request
                .get('/api/todos')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            })
            .then(response => {
                return response.body;
            })
            .then(todos => {
                expect(todos[0].expired).to.be.true;
            })
            .then(_ => {
                return Todo.remove({});
            });
    })

    it('Dovrebbe tornare expired false se dueDate è passata e completed è true', () => {
        return Todo.create(mocks.dueDatePastCompleted)
            .then(_ => {
                return request
                .get('/api/todos?showCompleted=true')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            })
            .then(response => {
                return response.body;
            })
            .then(todos => {
                expect(todos[0].expired).to.be.false;
            })
            .then(_ => {
                return Todo.remove({});
            });
    });

    it('Dovrebbe tornare expired false se dueDate non è passata e completed è false', () => {
        return Todo.create(mocks.dueDateFuture)
            .then(_ => {
                return request
                .get('/api/todos?showCompleted=true')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            })
            .then(response => {
                return response.body;
            })
            .then(todos => {
                expect(todos[0].expired).to.be.false;
            })
            .then(_ => {
                return Todo.remove({});
            });
    });

    it('Dovrebbe tornare expired false se dueDate non è passata e completed è true', () => {
        return Todo.create(mocks.dueDateFutureCompleted)
            .then(_ => {
                return request
                .get('/api/todos?showCompleted=true')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            })
            .then(response => {
                return response.body;
            })
            .then(todos => {
                expect(todos[0].expired).to.be.false;
            })
            .then(_ => {
                return Todo.remove({});
            });
    });

    after(() => {
        return Todo.remove({});
    })
});