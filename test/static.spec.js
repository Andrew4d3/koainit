import app from '../app'
import supertest from 'supertest'
import should from 'should'

const request = supertest.agent(app.listen())

describe('Test Static', function(){

    it('should return a HTML page with the GET method at /', function (done) {
      request
        .get('/')
        .expect(200)
        .end((err,res) => {
          should(res.headers['content-type'].indexOf('text/html')).not.equal(-1)
          done()
        })
    })

})
