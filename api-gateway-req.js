const deepAssign = require("deep-assign")

module.exports = (...overrides) => deepAssign({
  resource: "/{proxy+}",
  path: "/",
  httpMethod: "get",
  headers: {
    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "accept-encoding": "gzip, deflate, sdch, br",
    "accept-language": "it-IT,en-US;q=0.8,it;q=0.6,en;q=0.4",
    "cloudfront-forwarded-proto": "https",
    "cloudfront-is-desktop-viewer": true,
    "cloudfront-is-mobile-viewer": false,
    "cloudfront-is-smarttv-viewer": false,
    "cloudfront-is-tablet-viewer": false,
    "cloudfront-viewer-country": "IT",
    host: "1wvucwclti.execute-api.eu-west-1.amazonaws.com",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
    via: "2.0 9d2451a8646a37930fc6a6185abdc8f0.cloudfront.net (CloudFront)",
    "x-amz-cf-id": "aeIGLDifZM6bNMEWVNIlDAZlEIYUTPR98dxXZMelIbgfoECY1rVGNQ==",
    "x-amzn-trace-id": "Root=1-59f5e20b-1c97ea396ce7dfa853422df7",
    "x-forwarded-for": "93.37.214.20, 205.251.208.42",
    "x-forwarded-port": "443",
    "x-forwarded-proto": "https"
  },
  queryStringParameters: {},
  pathParameters: {
    proxy: "req"
  },
  stageVariables: null,
  requestContext: {
    path: "/staging/req",
    accountId: "477398036046",
    resourceId: "8vk9xb",
    stage: "staging",
    requestId: "57eb854e-bcb3-11e7-97b4-fd91e7bdc8b9",
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      apiKey: "",
      sourceIp: "93.37.214.20",
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
      user: null
    },
    resourcePath: "/{proxy+}",
    httpMethod: "GET",
    apiId: "1wvucwclti"
  },
  isBase64Encoded: false
}, ...overrides)
