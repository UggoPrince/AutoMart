/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* global before:true, describe:true, it:true, */
import fs from 'fs';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { seedCars } from '../api/server/database/Tables';
import app, { db } from './app';

dotenv.config();
chai.use(chaiHttp);

before('Seed cars table', async () => {
  process.env.CLOUDINARY_AUTOMART_FOLDER = 'automartTest';
  // eslint-disable-next-line no-console
  await db.pool.query(seedCars).then(res => res).catch((err) => { console.log(err); });
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
        .set({ authentication: process.env.tokenUser })
        .set('Content-Type', 'application/x-www-form-urlencoded')
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
    it('should not create a car advert when one or the fields is absent', (done) => {
      chai.request(app)
        .post('/api/v1/car')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set({ authentication: process.env.tokenUser })
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
        .set({ authentication: process.env.tokenUser })
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
        .set({ authentication: process.env.tokenUser })
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
        .set({ authentication: process.env.tokenUser })
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
        .set({ authentication: process.env.tokenUser })
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
        .set({ authentication: process.env.tokenUser })
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
        .set({ authentication: process.env.tokenUser })
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
        .set({ authentication: process.env.tokenUser })
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
        .set({ authentication: process.env.tokenUser })
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
        .set({ authentication: process.env.tokenUser })
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
        .set({ authentication: process.env.tokenUser })
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
        .set({ authentication: process.env.tokenUser })
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
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /api/v1/car?status=available', () => {
    it('should get all unsold cars', (done) => {
      chai.request(app)
        .get('/api/v1/car?status=available')
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not get all unsold cars when the status query string is incorrect', (done) => {
      chai.request(app)
        .get('/api/v1/car?status=availabless')
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not get all unsold/sold cars when query string is sent has more than 3 values', (done) => {
      chai.request(app)
        .get('/api/v1/car?a&b&c&d')
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /api/v1/car?status=available&min_price=value&max_price=value', () => {
    it('should get all unsold cars with a price range', (done) => {
      chai.request(app)
        .get('/api/v1/car?status=available&min_price=5000000.12&max_price=22000000.00')
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not get all unsold cars with a price range when one all query values are incorrect', (done) => {
      chai.request(app)
        .get('/api/v1/car?status=availables&min_price=5000000.12&max_price=22000000.00ggg')
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('DELETE /api/v1/car/:car_id', () => {
    it('should not delete a posted car ad if the user is not an admin', (done) => {
      chai.request(app)
        .delete('/api/v1/car/4')
        .set({ authentication: process.env.tokenUser2 })
        .end((err, res) => {
          expect(res.status).to.be.equal(403);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should delete a posted car ad', (done) => {
      chai.request(app)
        .delete('/api/v1/car/4')
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not delete a posted car ad if it does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/car/4')
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not delete a posted car ad if the id is not valid', (done) => {
      chai.request(app)
        .delete('/api/v1/car/4k')
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /api/v1/car', () => {
    it('should get all cars as admin, both sold and unsold', (done) => {
      chai.request(app)
        .get('/api/v1/car')
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not get all cars because user is not an admin', (done) => {
      chai.request(app)
        .get('/api/v1/car')
        .set({ authentication: process.env.tokenUser2 })
        .end((err, res) => {
          expect(res.status).to.be.equal(403);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /api/v1/car?status=available&state=new', () => {
    it('should get all used unsold cars', (done) => {
      chai.request(app)
        .get('/api/v1/car?status=available&state=new')
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not get all used unsold cars when any or all queries string are invalid', (done) => {
      chai.request(app)
        .get('/api/v1/car?status=availables&state=new')
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not get all used unsold cars when any or all queries string are invalid', (done) => {
      chai.request(app)
        .get('/api/v1/car?statuses=availables&states=useds')
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /api/v1/car?status=available&manufacturer=value', () => {
    it('should get all unsold cars from a specific manufacturer', (done) => {
      chai.request(app)
        .get('/api/v1/car?status=available&manufacturer=toyota')
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not get all unsold cars of a specific manufacturer', (done) => {
      chai.request(app)
        .get('/api/v1/car?status=availables&manufacturer=toyota')
        .set({ authentication: process.env.tokenUser })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});