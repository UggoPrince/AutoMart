/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* global describe:true, it:true, */
import fs from 'fs';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
chai.use(chaiHttp);

console.log(__dirname);

describe('Cars Test', () => {
  process.env.CLOUDINARY_AUTOMART_FOLDER = 'automartTest';
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
        .field('owner', 2)
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
          expect(res.status).to.be.eql(404);
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
          expect(res.status).to.be.eql(404);
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
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
