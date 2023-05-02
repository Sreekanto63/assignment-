const http = require('http');
const fs = require('fs');
const PORT = 3000;
const server = http.createServer((req, res) => {
  // Read the requested file from the public directory
  fs.readFile(`./public${req.url}`, (err, data) => {
    if (err) {
      // If the file doesn't exist, return a 404 error
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found');
      res.end();
    } else {
      // Otherwise, serve the file with the appropriate content type
      let contentType;
      if (req.url.endsWith('.html')) {
        contentType = 'text/html';
      } else if (req.url.endsWith('.css')) {
        contentType = 'text/css';
      } else if (req.url.endsWith('.js')) {
        contentType = 'text/javascript';
      } else {
        contentType = 'application/octet-stream';
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(data);
      res.end();
    }
  });
});
server.listen(PORT, () => {
  console.log(`Server run successfully`);
});
