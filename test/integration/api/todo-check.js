const expect = require('chai').expect;
const envUtils = require('../utils/env');
const Todo = require('../../../src/api/todo/todo.schema');
const app = require('../../../src/app');
const request = require('supertest')(app);
const mocks = require('../utils/mock-data');

describe('PATCH /check /uncheck', () => {
    before(()=> {
        return envUtils.connectMongo();
    })

    it('Dovrebbe impostare lo stato a completed', () => {
        return Todo.create(mocks.simple)
            .then(created => {
                return request
                    .patch(`/api/todos/${created._id.toString()}/check`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
            })
            .then(response => {
                return response.body;
            })
            .then(todo => {
                expect(todo).to.haveOwnProperty('completed', true);
            })
            .then(_ => {
                return Todo.remove({});
            });
    })

    it('Dovrebbe impostare lo stato a uncompleted', () => {
        return Todo.create(mocks.completed)
            .then(created => {
                return request
                    .patch(`/api/todos/${created._id.toString()}/uncheck`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
            })
            .then(response => {
                return response.body;
            })
            .then(todo => {
                expect(todo).to.haveOwnProperty('completed', false);
            })
            .then(_ => {
                return Todo.remove({});
            });
    })

    it('Dovrebbe tornare 404, id sbagliato uncheck', () => {
        return Todo.create(mocks.completed)
            .then(_ => {
                return request
                    .patch(`/api/todos/test/uncheck`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(404)
            })
            .then(response => {
                return response.body;
            })
            .then(body => {
                expect(body).to.haveOwnProperty('message', 'Not Found');
            })
            .then(_ => {
                return Todo.remove({});
            });
    })

    it('Dovrebbe tornare 404, id sbagliato check', () => {
        return Todo.create(mocks.simple)
            .then(_ => {
                return request
                    .patch(`/api/todos/test/check`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(404)
            })
            .then(response => {
                return response.body;
            })
            .then(body => {
                expect(body).to.haveOwnProperty('message', 'Not Found');
            })
            .then(_ => {
                return Todo.remove({});
            });
    })

    it('Dovrebbe tornare 404 - id non esistente check', () => {
        return Todo.create(mocks.simple)
            .then(_ => {
                return request
                    .patch(`/api/todos/5ebe6d25c4efad30b0ceeaaf/check`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(404)
            })
            .then(response => {
                return response.body;
            })
            .then(body => {
                expect(body).to.haveOwnProperty('message', 'Not Found');
            })
            .then(_ => {
                return Todo.remove({});
            });
    })

    it('Dovrebbe tornare 404 - id non esistente uncheck', () => {
        return Todo.create(mocks.completed)
            .then(_ => {
                return request
                    .patch(`/api/todos/5ebe6d25c4efad30b0ceeaaf/uncheck`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(404)
            })
            .then(response => {
                return response.body;
            })
            .then(body => {
                expect(body).to.haveOwnProperty('message', 'Not Found');
            })
            .then(_ => {
                return Todo.remove({});
            });
    })

    after(() => {
        return Todo.remove({});
    })
});