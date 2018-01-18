const Chronometer = require('./chronometer');
const Collector = require('./metrics-collector');
const MetricsServer = require('./metrics-server');

const metricMiddleware = options => {
  const server = new MetricsServer();
  const collector = new Collector();
  let port = (options && options.port) || 8190;
  const url = (options && options.url) || 'metrics';
  server.init(port, url, collector);

  return (req, res, next) => {
    const chronometer = new Chronometer();
    chronometer.start();
    let end = res.end;
    res.end = function() {
      let responseTime = chronometer.stop();
      end.apply(res, arguments);
      collector.collect(
        req.originalUrl,
        req.method,
        res.statusCode,
        responseTime
      );
    };
    next();
  };
};

module.exports = metricMiddleware;
