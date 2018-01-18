const http = require('http');

class MetricsServer {
  constructor() {
    let server = null;
  }

  init(port, url, collector) {
    this.server = http.createServer((req, res) => {
      if (req.url.match(`^\/${url}`)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify(collector.summary(), (key, value) => {
            if (key === 'callsHistory') {
              return undefined;
            }
            return value;
          })
        );
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`Try hitting /${url} instead`);
      }
    });
    this.server.listen(port);
  }
}

module.exports = MetricsServer;
