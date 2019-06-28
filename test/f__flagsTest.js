/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* global describe:true, it:true, */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

chai.use(chaiHttp);

describe('Flags Test', () => {
  const flag = {
    carId: 2,
    reason: 'repeated',
    description: 'I have seen this in so many ocassions by differnt accounts',
  };
  describe('POST /api/v1/flag', () => {
    it('should report an advert as fraud', (done) => {
      chai.request(app)
        .post('/api/v1/flag')
        .set({ authentication: process.env.tokenUser2 })
        .send(flag)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not report an advert when any or all the fields are invalid', (done) => {
      chai.request(app)
        .post('/api/v1/flag')
        .set({ authentication: process.env.tokenUser2 })
        .send({
          carId: 'k',
          reason: 'repeated **--)()',
          description: 'I have seen this in so many ocassions by differnt accounts',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not report an advert if the car id is not in database', (done) => {
      chai.request(app)
        .post('/api/v1/flag')
        .set({ authentication: process.env.tokenUser2 })
        .send({
          carId: 100,
          reason: 'repeated',
          description: 'I have seen this in so many ocassions by differnt accounts',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
