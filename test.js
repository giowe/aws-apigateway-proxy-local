const lambdaFn = (event, context, callback) => {
  console.log(event)
  callback(null, {
    statusCode: 200,
    headers: {
      thisIs: "a test header",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      thisIs: "a test body"
    })
  })
}

const app = require("./server")(lambdaFn, {
  middlewares: [
    (req, res, next) => {
      console.log("this is a middleware")
      next()
    }
  ]
})

