const expect = require('chai').expect;
const envUtils = require('../utils/env');
const Todo = require('../../../src/api/todo/todo.schema');
const app = require('../../../src/app');
const request = require('supertest')(app);
const mocks = require('../utils/mock-data');

describe('GET /todos', () => {
    before(()=> {
        return envUtils.connectMongo();
    })

    before(() => {
        const mockData = [
            mocks.simple, mocks.dueDatePast, mocks.dueDateFuture,
            mocks.dueDatePastCompleted, mocks.completed
        ];
        return Promise.all(mockData.map(todo => Todo.create(todo)));
    })

    it('Should create mock data', () => {
        return Todo.find()
            .then(todos => {
                expect(todos).to.have.lengthOf(5);
            });
    })

    it('Dovrebbe tornare solo i todo da completare', () => {
        return request
            .get('/api/todos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                return response.body;
            })
            .then(todos => {
                expect(todos).to.have.lengthOf(3);
            });
    })

    it('Dovrebbe tornare tutti i todo', () => {
        return request
            .get('/api/todos?showCompleted=tRuE')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                return response.body;
            })
            .then(todos => {
                expect(todos).to.have.lengthOf(5);
            });
    });

    it('Dovrebbe tornare solo i todo da completare (showCompleted !== true)', () => {
        return request
            .get('/api/todos?showCompleted=Asd')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                return response.body;
            })
            .then(todos => {
                expect(todos).to.have.lengthOf(3);
            });
    });

    after(() => {
        return Todo.remove({});
    })
});