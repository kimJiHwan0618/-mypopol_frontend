const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware(['/api'], {
      target: 'http://localhost:3000',
      // target: 'https://diamond.hingomdev.com/api',
      changeOrigin: true,
      router: {},
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
