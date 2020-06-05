const expect = require('chai').expect;
const envUtils = require('../utils/env');
const Todo = require('../../../src/api/todo/todo.schema');
const app = require('../../../src/app');
const request = require('supertest')(app);
const mocks = require('../utils/mock-data');

describe('POST /todos', () => {
    before(()=> {
        return envUtils.connectMongo();
    })

    it('Dovrebbe creare un nuovo todo e tornarlo con codice 201, senza dueDate', () => {
        return request
            .post('/api/todos')
            .send(mocks.simple)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                return response.body;
            })
            .then(todo => {
                expect(todo).to.haveOwnProperty('title', 'Test1');
                expect(todo).to.haveOwnProperty('completed', false);
                expect(todo).to.haveOwnProperty('expired', false);
            });
    })

    it('Dovrebbe creare un nuovo todo e tornarlo con codice 201, con dueDate', () => {
        return request
            .post('/api/todos')
            .send(mocks.dueDatePast)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                return response.body;
            })
            .then(todo => {
                expect(todo).to.haveOwnProperty('title', mocks.dueDatePast.title);
                expect(todo).to.haveOwnProperty('dueDate', mocks.dueDatePast.dueDate.toISOString());
                expect(todo).to.haveOwnProperty('completed', false);
                expect(todo).to.haveOwnProperty('expired', true);
            });
    })

    it('Dovrebbe non tenere conto del campo completed mandato', () => {
        return request
            .post('/api/todos')
            .send(mocks.completed)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                return response.body;
            })
            .then(todo => {
                expect(todo).to.haveOwnProperty('title', mocks.completed.title);
                expect(todo).to.haveOwnProperty('completed', false);
            });
    })


    after(() => {
        return Todo.remove({});
    })
});