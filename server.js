const apiGatewayReq = require('./api-gateway-req');
const bodyParser = require('body-parser');
const express = require('express');
const app = new express();

// eslint-disable-next-line no-console
module.exports = (port, lambdaFn, handler, apiGatewayReqOverrides = {}, logger = {log: console.log, error: console.log, success: console.log}) => {
  const fn = lambdaFn[handler];

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.all('*', (req, res) => {
    const fail = err => res.send(err);

    const succeed = ({statusCode, headers, body}) => {
      Object.entries(headers).forEach(([field, value]) => res.header(field, value));
      res.status(statusCode).send(body);
    };

    const done = (err, data) => {
      if (err) fail(err);
      else succeed(data);
    };

    const context = {fail, succeed, done};
    const callback = (err, data) => {
      if (err) return fail(err);
      succeed(data);
    };

    try {
      fn(apiGatewayReq({
        httpMethod: req.method,
        path: req.path,
        headers: req.headers,
        body: JSON.stringify(req.body),
        queryStringParameters: req.query
      }, apiGatewayReqOverrides), context, callback);
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
        error: {
          message: err.message,
          stack: err.stack
        }
      });
    }
  });

  app.listen(port, () => logger.success(`listening on port ${port}`));
};
