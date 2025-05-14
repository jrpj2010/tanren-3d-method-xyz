const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<html><body><h1>Hello from simple Node.js server!</h1></body></html>');
});

const PORT = 9090;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Also try: http://192.168.11.43:${PORT}/`);
  console.log(`Or: http://192.168.11.38:${PORT}/`);
});