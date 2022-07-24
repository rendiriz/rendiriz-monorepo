const { createServer } = require('http');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3002;

module.exports = async (nextApp, settings, proxyConfig) => {
  settings.dev = dev;
  settings.hostname = hostname;
  settings.port = port;

  const handle = nextApp.getRequestHandler();
  return nextApp.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  });
};
