/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* global before:true, describe:true, it:true, */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Tables from '../server/database/Tables';
import app, { db } from './app';

chai.use(chaiHttp);

before('Create Tables', async () => {
  await db.query(Tables.createTables);
  await db.query(Tables.seedUsers);
});

describe('Users Test', () => {
  const newUser = {
    first_name: 'john',
    last_name: 'matthew',
    email: 'johnmatthew@gmail.com',
    password: 'k12345kljd',
    address: 'no 3 ikorodu',
  };

  const newUser2 = {
    first_name: 'john',
    last_name: 'matthew',
    email: 'joshua@gmail.com',
    password: 'k12345kljd',
    address: 'no 3 ikorodu',
  };

  const newUser3 = {
    first_name: 'john',
    last_name: 'matthew',
    email: 'admin@gmail.com',
    password: 'k12345kljd',
    address: 'no 3 ikorodu',
  };

  const invalidData = {
    first_name: 45,
    last_name: 'matthew*-*',
    email: 'johnmatthewgmail.com',
    password: 'k123',
    address: '12****---',
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
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should sign up a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser2)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
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
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should sign up a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser3)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
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
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('POST /api/v1/auth/signin', () => {
    const admin = {
      email: 'johndoe@gmail.com',
      password: 'doe123456',
    };
    const user = {
      email: 'johnmatthew@gmail.com',
      password: 'k12345kljd',
    };
    it('should sign in a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          process.env.tokenUser = res.body.data.token;
          done();
        });
    });
    it('should sign in a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          process.env.tokenUser2 = res.body.data.token;
          done();
        });
    });
    it('should sign in a user', (done) => {
      process.env.tokenTime = '-1h';
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          process.env.tokenUser3 = res.body.data.token;
          done();
        });
    });
    it('should not sign in a user when one or all fields are not provided', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
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
          expect(res.status).to.be.eql(400);
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
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
