import app from '../app'
import supertest from 'supertest'
import should from 'should'

const request = supertest.agent(app.listen())

describe('Test Router', function () {

  it('should return 200 OK with the GET method at /', function (done) {
    request
      .get('/')
      .expect(200)
      .expect('Hello from GET /', done)
  })

  it('should return 200 OK with the GET method at /api', function (done) {
    request
      .get('/api')
      .expect(200)
      .expect('Hello from GET /api', done)
  })

  it('should return 200 OK with the GET method at /api/:id', function (done) {
    request
      .get('/api/123')
      .expect(200)
      .expect('Hello from GET /api with :id 123', done)
  })

  it('should return 404 OK at some unknown path', function (done) {
    request
      .get('/unknown')
      .expect(404,done)
  })

  it('should return 200 OK with the POST method at /api', function (done) {
    request
      .post('/api')
      .expect(200)
      .expect('Hello from POST /api', done)
  })

  it('should return 200 OK with the PUT method at /api/:id', function (done) {
    request
      .put('/api/123')
      .expect(200)
      .expect('Hello from PUT /api with :id 123', done)
  })

  it('should return 200 OK with the DELETE method at /api/:id', function (done) {
    request
      .del('/api/123')
      .expect(200)
      .expect('Hello from DELETE /api with :id 123', done)
  })
})