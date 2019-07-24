/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* global describe:true, it:true, */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

chai.use(chaiHttp);


describe('Orders Test', () => {
  const newOrder = {
    car_id: 1,
    amount: 600000.13,
  };
  describe('POST /api/v1/order', () => {
    it('should not make a purchase order when one or all the fields are not provided', (done) => {
      chai.request(app)
        .post('/api/v1/order/')
        .set({ Authorization: `Bearer ${process.env.tokenUser}` })
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
        .set({ Authorization: `Bearer ${process.env.tokenUser}` })
        .send({
          car_id: 33,
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
        .set({ Authorization: `Bearer ${process.env.tokenUser}` })
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
        .set({ Authorization: `Bearer ${process.env.tokenUser}` })
        .send(newOrder)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /api/v1/order?buyer=value', () => {
    it('should get all the orders made by the user', (done) => {
      chai.request(app)
        .get('/api/v1/order?buyer=1')
        .set({ Authorization: `Bearer ${process.env.tokenUser}` })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not get all the orders made by the user if a wrong id is sent', (done) => {
      chai.request(app)
        .get('/api/v1/order?buyer=15')
        .set({ Authorization: `Bearer ${process.env.tokenUser}` })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not get all the orders made by the user if url has wrong query string or  incorrect id is sent',
      (done) => {
        chai.request(app)
          .get('/api/v1/order?buyer=15k')
          .set({ Authorization: `Bearer ${process.env.tokenUser}` })
          .end((err, res) => {
            expect(res.status).to.be.eql(400);
            expect(res.type).to.be.equal('application/json');
            expect(res.body).to.be.an('object');
            done();
          });
      });
  });

  describe('PATCH /api/v1/order/:order_id/price', () => {
    const update = {
      price: 1200000.001,
    };
    it('should update the price of a purchase order', (done) => {
      chai.request(app)
        .patch('/api/v1/order/2/price')
        .set({ Authorization: `Bearer ${process.env.tokenUser}` })
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
        .set({ Authorization: `Bearer ${process.env.tokenUser}` })
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
        .set({ Authorization: `Bearer ${process.env.tokenUser}` })
        .send({ price: '1222kl' })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
