/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* global describe:true, it:true, */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

chai.use(chaiHttp);

describe('Cars Test', () => {
  const newOrder = {
    buyer: 2,
    carId: 3,
    amount: 600000.13,
  };
  describe('POST /api/v1/order', () => {
    it('should not make a purchase order when one or all the fields are not provided', (done) => {
      chai.request(app)
        .post('/api/v1/order/')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not make a purchase order if wrong id values are sent', (done) => {
      chai.request(app)
        .post('/api/v1/order/')
        .send({
          buyer: 22,
          carId: 33,
          amount: 1200000,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should make a purchase order', (done) => {
      chai.request(app)
        .post('/api/v1/order/')
        .send(newOrder)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
