const server = require('./testServer');
const express = require('express');
const request = require('supertest');
const expect = require('chai').expect;
const axios = require('axios');
const sinon = require('sinon');
const expressResponse = require('../index');
let metricsServer = require('../middleware/metrics-server');
const app = express();

describe('Express Response Metrics use', () => {

  before(() => {
        axios.get('http://localhost:3001/example/url');
        axios.get('http://localhost:3001/example/url');
        axios.get('http://localhost:3001/example/url', { headers: {'x-fail': 'true'}}).catch(()=>{});
        axios.get('http://localhost:3001/example/url');
        axios.post('http://localhost:3001/example/url',null,{ headers: {'x-fail': 'true'}}).catch(()=>{});
        axios.post('http://localhost:3001/example/url');
        axios.get('http://localhost:3001/example/otherURL');
        axios.post('http://localhost:3001/example/otherURL',null,{ headers: {'x-fail': 'true'}}).catch(()=>{});
  });

  it('GET - metrics - /example/url', (done) => {
    request('http://localhost:8190')
    .get('/metrics')
    .expect(200)
    .expect((res) => {
      expect(res.body['/example/url'].GET.success.count).to.equal(3);
      expect(res.body['/example/url'].GET.error.count).to.equal(1);
    })
    .end((err, res) => {
      if(err) {
        done(err)
      } else {
        done();
      }
    })

  });

  it('POST - metrics -/example/url', (done) => {
    request('http://localhost:8190')
    .get('/metrics')
    .expect(200)
    .expect((res) => {
      expect(res.body['/example/url'].POST.success.count).to.equal(1);
      expect(res.body['/example/url'].POST.error.count).to.equal(1);
    })
    .end((err, res) => {
      if(err) {
        done(err)
      } else {
        done();
      }
    })
  });

  it('GET - metrics - /example/otherURL', (done) => {
    request('http://localhost:8190')
    .get('/metrics')
    .expect(200)
    .expect((res) => {
      expect(res.body['/example/otherURL'].GET.success.count).to.equal(1);
      expect(res.body['/example/otherURL'].GET.error).to.be.undefined
    })
    .end((err, res) => {
      if(err) {
        done(err)
      } else {
        done();
      }
    })

  });

  it('POST - metrics -/example/otherURL', (done) => {
    request('http://localhost:8190')
    .get('/metrics')
    .expect(200)
    .expect((res) => {
      expect(res.body['/example/otherURL'].POST.error.count).to.equal(1);
      expect(res.body['/example/otherURL'].POST.success).to.be.undefined;
    })
    .end((err, res) => {
      if(err) {
        done(err)
      } else {
        done();
      }
    })
  });

  after(() => {
    server.close();
  })

})
