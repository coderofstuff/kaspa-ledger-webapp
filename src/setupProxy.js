const bodyParser = require('body-parser');
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:5000/",
      pathRewrite: {
        "^/api": "",
      },
      onProxyReq: (proxyReq, req, res) => {
          if (req.method == 'POST' && req.body && req.body.apduHex) {
            const newData = JSON.stringify({data: req.body.apduHex});
            proxyReq.setHeader('content-type', 'application/json');
            proxyReq.setHeader('content-length', newData.length);

            // Write out body changes to the proxyReq stream
            proxyReq.write(newData);
            proxyReq.end();
          }
      },
      onProxyRes: (proxyRes, req, res) => {
        // Make any request to speculos for GET return 200
        if (req.method == 'GET') {
          proxyRes.statusCode = 200;
        }
      },
    })
  );
};
