# express-response-metrics

Express middleware to collect metrics

##Instalation

excute the follow command in ypur project folder

```shell
npm install express-response-metrics --save
```

## How to use:

```javascript
'use strict';

const express = require('express');
const responseMetrics = require('express-response-metrics');

const app = express();

app.use(responseMetrics({
  port: 8190
});

```
