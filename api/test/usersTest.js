/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* global describe:true, it:true, */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
chai.use(chaiHttp);

describe('Users Test', () => {
  const newUser = {
    firstname: 'john',
    lastname: 'matthew',
    email: 'johnmatthew@gmail.com',
    password: 'k12345kljd',
    address: 'no 3 ikorodu',
    phoneNumber: '07034533669',
  };

  const invalidData = {
    firstname: 45,
    lastname: 'matthew',
    email: 'johnmatthewgmail.com',
    password: 'k123',
    address: '12',
    phoneNumber: '07',
  };
  describe('POST /api/v1/auth/signup', () => {
    it('should sign up a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not sign up a user if user has an account with the specified email.', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not sign up a user if one or all the fields are missing', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not sign up a user one or all the fields are invalid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should tell the user "Not Found" when the url path is wrong', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signu')
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          done();
        });
    });
  });

  describe('POST /api/v1/auth/signin', () => {
    const user = {
      email: 'johnmatthew@gmail.com',
      password: 'k12345kljd',
    };
    it('should sign in a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not sign in a user when one or all fields are not provided', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not sign in a user when a wrong email is provided', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'thony@gmail.com', password: 'kh123456kjhf' })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not sign in a user when a wrong password is provided', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'johnmatthew@gmail.com', password: 'kh123456kjhf' })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});