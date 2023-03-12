import chai from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../src/index'

chai.use(chaiHttp)

const expect = chai.expect

describe('Notification API', () => {
  describe('/handleNotification', () => {
    it('should return 400 with error message when email is missing', (done) => {
      chai
        .request(app)
        .get('/api/handleNotification')
        .send({ message: 'Hello, World!' })
        .end((err, res) => {
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('error').to.equal('"email" is required')
          done()
        })
    })

    it('should return 200 with success message when email is provided and message is empty', (done) => {
      chai
        .request(app)
        .get('/api/handleNotification')
        .send({ email: 'test@example.com', message: '' })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('success').to.equal(true)
          done()
        })
    })

    it('should return 200 with success message when email and messages are provided', (done) => {
      chai
        .request(app)
        .get('/api/handleNotification')
        .send({ email: 'test@example.com', message: 'Hello, World!' })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('success').to.equal(true)
          done()
        })
    })
  })
})
