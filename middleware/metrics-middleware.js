const Chronometer = require('./Chronometer');
const Collector = require('./metrics-collector');
const MetricsServer = require('./metrics-server')

const metricMiddleware = (options) => {
  //any options goes here
  const server = new MetricsServer();
  const collector = new Collector();
  server.init(8190, collector);

  return (req, res, next) => {
      let chronometer = new Chronometer();
      chronometer.start();
      let end = res.end;
      res.end = function ()  {
        let responseTime = chronometer.stop();
        end.apply(res, arguments);
        collector.collect(req.originalUrl, req.method, res.statusCode, responseTime);
      };
      next();
    }
}

module.exports = metricMiddleware;
