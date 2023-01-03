import chai, { use } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../server';
import { UserSchema } from '../models/userSchema';

interface TestFieldsProps {
  age: number;
  hobbies: string[];
}

const responseCode = 400;
const user = {
  username: 'Alex',
  age: 0,
  hobbies: [],
};

const id = 'invalid-id';

const testFields: TestFieldsProps = { age: user.age, hobbies: user.hobbies };

chai.should();

chai.use(chaiHttp);

describe('Test a User with invalid input and response code 400', () => {

  // Test for /GET:id
  
  describe('/GET/:id user with invalid id', () => { 
    it('it should return response code of 400 for a user with invalid id', done => {
      chai.request(server)
        .get(`/api/users/${id}`)
        .end((err, res) => {
          res.should.have.status(responseCode);
          done();
        });
    });
  });

  // Test for /POST

  describe('/POST a new user with invalid body', () => {
    it('it should return response code of 400 if the body does not contain required fields ', done => {
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(responseCode);
          res.body.should.be.a('object');
          done();
        });
    });
  });


  // Test for /PUT:id

  describe('/PUT/:id user with invalid id', () => {
    it('it should return response code of 400 for a user with invalid id', done => {
      chai.request(server)
        .put(`/api/users/${id}`)
        .send(testFields)
        .end((err, res) => {
          res.should.have.status(responseCode);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  // Test for /DELETE:id

  describe('/DELETE/:id user', () => {
    it('it should return response code of 400 for a user with invalid id', done => {
      chai.request(server)
        .delete(`/api/users/${id}`)
        .end((err, res) => {
          res.should.have.status(responseCode);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
