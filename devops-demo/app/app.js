const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Basic logging
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: "Hello from DevOps 🚀",
      status: "success"
    }));
  }

  // Health check endpoint (VERY IMPORTANT)
  else if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: "UP",
      timestamp: new Date()
    }));
  }

  // 404 handler
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: "Route not found"
    }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Graceful shutdown (used in Docker/Kubernetes)
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server stopped');
    process.exit(0);
  });
});