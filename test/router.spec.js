const app = require('../app')
const supertest = require('supertest')
const should = require('should')
const { expect } = require('chai')

const request = supertest.agent(app.listen())

const generateToken = () => {
  // TODO Generate Secret token using config vars over here
  return 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MTczMjQ1MjcsImV4cCI6MTU0ODg2MDUyNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSJ9.Sdks3VjAdMG17x2jB9yRsorOY4XbV-rIri4PK4GuKDA'
}

describe('Test Router', function () {

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
      .expect(404, done)
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

  it('should echo a request body', function (done) {
    request
      .post('/echo/request')
      .send({ foo: 12345 })
      .expect(200)
      .then((res) => {
        expect(res.body.echo).to.exist
        expect(res.body.echo.foo).to.equal(12345)
        done()
      })
  })

  it('should display a correct generated template', function (done) {
    request
      .get('/view/welcome')
      .expect(200)
      .then((res) => {
        expect(res.text).to.equal('<h1>Welcome Koa2 from an EJS template</h1>\r\n')
        done()
      })
  })

  it('should authenticate a signed request', function (done) {
    request
      .post('/jwt/endpoint')
      .set('Authorization', generateToken())
      .expect(200)
      .expect('This is an authorized response', done)
  })

  it('should reject an unauthorized request', function (done) {
    request
      .post('/jwt/endpoint')
      .set('Authorization', 'Bearer BadToken')
      .expect(401, done)
  })
})
