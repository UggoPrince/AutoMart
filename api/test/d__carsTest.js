/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* global before:true, describe:true, it:true, */
import fs from 'fs';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
chai.use(chaiHttp);

before('', () => {
  process.env.CLOUDINARY_AUTOMART_FOLDER = 'automartTest';
});

describe('Cars Test', () => {
  const carAdvert = {
    owner: 2,
    state: 'new',
    status: 'available',
    price: 16000000.00,
    title: 'New Mercedes truck',
    manufacturer: 'Mercedes',
    model: 'Mercedes 455',
    body_type: 'Trailer truck',
  };
  describe('POST /api/v1/car', () => {
    it('should create a car advert', (done) => {
      chai.request(app)
        .post('/api/v1/car')
        .set('Content-Type', 'application/x-www-form-urlencoded') // ('Content-Type', 'multipart/form-data')
        .field('owner', 1)
        .field('state', 'new')
        .field('status', 'available')
        .field('price', 16000000)
        .field('title', carAdvert.title)
        .field('manufacturer', carAdvert.manufacturer)
        .field('model', carAdvert.model)
        .field('bodyType', carAdvert.body_type)
        .attach('photo', fs.readFileSync(`${__dirname}/testImages/c1.jpg`), 'c1.jpg')
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not create a car advert when the owner id does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/car')
        .set('Content-Type', 'application/x-www-form-urlencoded') // ('Content-Type', 'multipart/form-data')
        .field('owner', 7)
        .field('state', 'new')
        .field('status', 'available')
        .field('price', 16000000)
        .field('title', carAdvert.title)
        .field('manufacturer', carAdvert.manufacturer)
        .field('model', carAdvert.model)
        .field('bodyType', carAdvert.body_type)
        .attach('photo', fs.readFileSync(`${__dirname}/testImages/c1.jpg`), 'c1.jpg')
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not create a car advert when the owner id not an integer', (done) => {
      chai.request(app)
        .post('/api/v1/car')
        .set('Content-Type', 'application/x-www-form-urlencoded') // ('Content-Type', 'multipart/form-data')
        .field('owner', 'j')
        .field('state', 'new')
        .field('status', 'available')
        .field('price', 16000000)
        .field('title', carAdvert.title)
        .field('manufacturer', carAdvert.manufacturer)
        .field('model', carAdvert.model)
        .field('bodyType', carAdvert.body_type)
        .attach('photo', fs.readFileSync(`${__dirname}/testImages/c1.jpg`), 'c1.jpg')
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not create a car advert when one or the fields is absent', (done) => {
      chai.request(app)
        .post('/api/v1/car')
        .set('Content-Type', 'application/x-www-form-urlencoded') // ('Content-Type', 'multipart/form-data')
        .field('owner', '')
        .field('state', 'news')
        .field('status', 'availabless')
        .field('price', 'kl')
        .field('title', 1)
        .field('manufacturer', 1)
        .field('model', 1)
        .field('bodyType', 'kl')
        .attach('photo', ''/* fs.readFileSync(`${__dirname}/testImages/c1.jpg`) */, 'c1.jpg')
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not create a car advert when a wrong data type is sent', (done) => {
      chai.request(app)
        .post('/api/v1/car')
        .set('Content-Type', 'application/x-www-form-urlencoded') // ('Content-Type', 'multipart/form-data')
        .field('owner', '')
        .field('state', '')
        .field('status', '')
        .field('price', '')
        .field('title', '')
        .field('manufacturer', '')
        .field('model', '')
        .field('bodyType', '')
        .attach('photo', fs.readFileSync(`${__dirname}/testImages/mypdf.pdf`), 'mypdf.pdf')
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('PATCH /api/v1/car/:car_id/status', () => {
    it('should update the status of a car', (done) => {
      chai.request(app)
        .patch('/api/v1/car/1/status')
        .send({ newStatus: 'sold' })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not update the status of a car when the carId or/and the newStatus are invalid.', (done) => {
      chai.request(app)
        .patch('/api/v1/car/p/status')
        .send({ newStatus: 'solds' })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not update the status of a car when the carId does not exist in database.', (done) => {
      chai.request(app)
        .patch('/api/v1/car/22/status')
        .send({ newStatus: 'sold' })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should bot update the status of a car when the newStatus is not sent.', (done) => {
      chai.request(app)
        .patch('/api/v1/car/2/status')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('PATCH /api/v1/car/:car_id/price', () => {
    it('should update the price of a car advert', (done) => {
      chai.request(app)
        .patch('/api/v1/car/1/price')
        .send({ newPrice: 120000.12 })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not update the price of a car when the carId or/and the newPrice are invalid.', (done) => {
      chai.request(app)
        .patch('/api/v1/car/p/price')
        .send({ newPrice: 'solds' })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should bot update the price of a car when the newPrice is not sent.', (done) => {
      chai.request(app)
        .patch('/api/v1/car/2/price')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not update the price of a car when the carId does not exist in database.', (done) => {
      chai.request(app)
        .patch('/api/v1/car/120/price')
        .send({ newPrice: 121212 })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /api/v1/car/:car_id/', () => {
    it('should get a specitic car', (done) => {
      chai.request(app)
        .get('/api/v1/car/1')
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not get a specitic car when the car id is invalid', (done) => {
      chai.request(app)
        .get('/api/v1/car/1k')
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not get a specitic car when the car id does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/car/100')
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
