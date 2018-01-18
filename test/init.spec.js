const express = require('express');
const expect = require('chai').expect;
const sinon = require('sinon');
const expressResponse = require('../index');
let metricsServer = require('../middleware/metrics-server');
const app = express();

describe('Express Response Metrics init', () => {
  let stub;
  beforeEach(() => {
    stub = sinon.stub(metricsServer.prototype, 'init');
  });

  it('should use the default port no option is passed', () => {
    app.use(expressResponse());
    expect(stub.calledWithMatch(8190)).to.be.true;
  });

  it('should use the port passed in the option object', () => {
    app.use(expressResponse({ port: 9090 }));
    expect(stub.calledWithMatch(9090)).to.be.true;
  });

  it('should use metrics if no url is passed', () => {
    app.use(expressResponse());
    expect(stub.calledWithMatch(8190, 'metrics')).to.be.true;
  });

  it('should use the url inputed by the user if the url options is present', () => {
    app.use(expressResponse({ url: 'systemMetrics' }));
    expect(stub.calledWithMatch(8190, 'systemMetrics')).to.be.true;
  });

  afterEach(() => {
    stub.restore();
  });
});
