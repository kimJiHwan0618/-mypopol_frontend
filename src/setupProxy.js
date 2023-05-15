const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware(['/api'], {
      target: 'http://localhost:3000',
      // target: 'https://kimjihodo.synology.me:3001',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
