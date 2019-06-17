/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* global describe:true, it:true, */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { dropTables } from '../server/database/Tables';
import app, { db } from './app';

chai.use(chaiHttp);

describe('Index Test', () => {
  describe('GET /swagger.json', () => {
    it('should return a json object of the api documentation', (done) => {
      chai.request(app)
        .get('/swagger.json')
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should return html of home page', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('text/html');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not return not found when a wrong url is used', (done) => {
      chai.request(app)
        .get('/carss')
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('string');
          done();
        });
    });
  });
});

describe('Drop database tables', async () => {
  // eslint-disable-next-line no-unused-vars
  await db.pool.query(dropTables, (err, res) => {
  // eslint-disable-next-line no-console
    if (err) console.log(err);
  });
});
