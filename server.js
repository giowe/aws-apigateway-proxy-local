/* eslint-disable no-console */
const apiGatewayReq = require("./api-gateway-req")
const bodyParser = require("body-parser")
const express = require("express")
const app = new express()

module.exports = (lambdaFn, options = {}) => {
  const {
    port = 8888,
    listeningMessage = `aws-apigateway-proxy-local listening on port ${port}`,
    apiGatewayReqOverrides = {},
    logger = {
      log: console.log,
      error: console.log,
      success: console.log
    },
    middlewares
  } = options

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  if (middlewares) {
    app.use(middlewares)
  }

  app.all("*", (req, res) => {
    const fail = err => res.send(err)

    const succeed = ({ statusCode, headers, body }) => {
      Object.entries(headers).forEach(([field, value]) => res.header(field, value))
      res.status(statusCode).send(body)
    }

    const done = (err, data) => {
      if (err) fail(err)
      else succeed(data)
    }

    const callback = (err, data) => {
      if (err) return fail(err)
      succeed(data)
    }

    try {
      lambdaFn(apiGatewayReq({
        httpMethod: req.method,
        path: req.path,
        headers: req.headers,
        body: JSON.stringify(req.body),
        queryStringParameters: req.query
      }, apiGatewayReqOverrides), { fail, succeed, done }, callback)
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
        error: {
          message: err.message,
          stack: err.stack
        }
      })
    }
  })

  app.listen(port, () => logger.success(listeningMessage))

  return app
}
