import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../server';

const id = '4d6f6c0a-8094-4b81-9463-a219469cda86';
const responseCode = 404;
const testFields = {
  "age": 9,
  "hobbies": [
      "Judo",
      "Lego"
  ]
};

chai.should();

chai.use(chaiHttp);

describe('Test a non-existing User and response code 404', () => {

  // Test for /GET:id
  
  describe('/GET/:id user', () => { 
    it('it should return response code of 404 for non-existing user', done => {
      chai.request(server)
        .get(`/api/users/${id}`)
        .end((err, res) => {
          res.should.have.status(responseCode);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User not found');
          done();
        });
    });
  });

  // Test for /PUT:id

  describe('/PUT/:id user', () => {
    it('it should return response code of 404 for non-existing user', done => {
      chai.request(server)
        .put(`/api/users/${id}`)
        .send(testFields)
        .end((err, res) => {
          res.should.have.status(responseCode);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User not found');
          done();
        });
    });
  });

  // Test for /DELETE:id

  describe('/DELETE/:id user', () => {
    it('it should return response code of 404 for non-existing user', done => {
      chai.request(server)
        .delete(`/api/users/${id}`)
        .end((err, res) => {
          res.should.have.status(responseCode);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User not found');
          done();
        });
    });
  });
});

