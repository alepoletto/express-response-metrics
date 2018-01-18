# express-response-metrics

Express middleware to collect metrics

## Instalation

execute the follow command in your project folder

```shell
npm install express-response-metrics --save
```

or this if yarn is more your thing

```shell
yarn add express-response-metrics
```

## How to use:

just require the module and register it as an express middleware.

```javascript
'use strict';

const express = require('express');
const responseMetrics = require('express-response-metrics');

const app = express();

app.use(
  responseMetrics({
    port: 8190
  })
);
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

## Options

you can provide the follow options

```javascript
app.use(
  responseMetrics({
    port: 9090, // if no port is provided 8190 will be used as default
    url: 'some_url' // if no url is provided 'metrics' will be used as default
  })
);
```

## Why another metric framework?

I had a need to collect metrics for every route of my server in success and error cases. None of the metric modules was doing 100% what I wanted so I build this.
