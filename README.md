# express-response-metrics

Express middleware to collect metrics

##Instalation

excute the follow command in ypur project folder

```shell
npm install express-response-metrics --save
```

## How to use:

just require the module and register it as an express middleware.

you need to provide a port.

```javascript
'use strict';

const express = require('express');
const responseMetrics = require('express-response-metrics');

const app = express();

app.use(responseMetrics({
  port: 8190
});

```

all set, all your metrics will be available at http://<your_host>/8190/metrics ex: http://localhost:8190/metrics in a json format like this

```javascript
{
  "/example/user": {
    "GET": {
      "success": {
        "count": 12,
        "min": 2,
        "max": 7,
        "mean": 3,
        "p75": 3,
        "p95": 6.699999999999996,
        "p99": 7
      },
      "error": {
        "count": 2,
        "min": 2,
        "max": 3,
        "mean": 2.5,
        "p75": 3,
        "p95": 3,
        "p99": 3
      }
    }
  },
  "/example/user/vip": {
    "GET": {
      "error": {
        "count": 1,
        "min": 3,
        "max": 3,
        "mean": 3,
        "p75": 3,
        "p95": 3,
        "p99": 3
      }
    }
  }
}

```

the metrics will be collect for success and error cases.

## Why another metric framework?

I had a need to collect metrics for every route of my server in success and error cases. None of the metric modules was doing 100% what I wanted so I build this.
