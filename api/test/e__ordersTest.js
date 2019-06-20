/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* global after:true, describe:true, it:true, */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { dropTables } from '../server/database/Tables';
import app, { db } from './app';

chai.use(chaiHttp);

after(async () => {
  await db.pool.query(dropTables).then(res => res).catch((err) => { console.log(err); });
});

describe('Orders Test', () => {
  const newOrder = {
    buyer: 1,
    carId: 1,
    amount: 600000.13,
  };
  describe('POST /api/v1/order', () => {
    it('should not make a purchase order when one or all the fields are not provided', (done) => {
      chai.request(app)
        .post('/api/v1/order/')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
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

  describe('PATCH /api/v1/order/:order_id/price', () => {
    const update = {
      newAmount: 1200000.001,
    };
    it('should update the price of a purchase order', (done) => {
      chai.request(app)
        .patch('/api/v1/order/2/price')
        .send(update)
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not update the order price if the status is accepted or rejected', (done) => {
      chai.request(app)
        .patch('/api/v1/order/5/price')
        .send(update)
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
        });
      chai.request(app)
        .patch('/api/v1/order/100/price')
        .send(update)
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
        });
      done();
    });
    it('should not update price if the new price is not a float', (done) => {
      chai.request(app)
        .patch('/api/v1/order/3/price')
        .send({ newAmount: '1222kl' })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    /* it('should not update price if the order id is not valid', (done) => {
      chai.request(app)
        .patch('/api/v1/order/33/price')
        .send(update)
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    }); */
  });
});
