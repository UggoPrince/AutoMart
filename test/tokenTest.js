/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* global after:true, describe:true, it:true, */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { dropTables } from '../api/server/database/Tables';
import app, { db } from './app';

chai.use(chaiHttp);

after(async () => {
  // eslint-disable-next-line no-console
  await db.pool.query(dropTables).then(res => res).catch((err) => { console.log(err); });
});

describe('Test token not sent and also test token has expired', () => {
  const user = {
    email: 'johnmatthew@gmail.com',
    password: 'k12345kljd',
  };
  const flag = {
    carId: 2,
    reason: 'repeated',
    description: 'I have seen this in so many ocassions by differnt accounts',
  };
  it('should sign in a user to get expired token', (done) => {
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
  it('should not report an advert as fraud because no Authorization header was sent', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .send(flag)
      .end((err, res) => {
        expect(res.status).to.be.eql(401);
        expect(res.type).to.be.equal('application/json');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should report an advert as fraud because token has expired', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set({ Authorization: `Bearer ${process.env.tokenUser3}` })
      .send(flag)
      .end((err, res) => {
        expect(res.status).to.be.eql(401);
        expect(res.type).to.be.equal('application/json');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
