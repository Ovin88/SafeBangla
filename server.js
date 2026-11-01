/**
 * SafeBangla Web Application Server
 * Serves the Crisis Response Web App & mock REST API on port 3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Note: Container environment sets PORT=8080 for nginx.
// Nginx proxies incoming traffic to localhost:3000, so our web server must listen on 3000.
const PORT = 3000;
const WEB_DIR = path.join(__dirname, 'web');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Set standard CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Routes
  if (pathname === '/api/v1/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'HEALTHY',
      service: 'SafeBangla Web Crisis Gateway',
      environment: 'production-ready',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  if (pathname === '/api/v1/sos/trigger' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const packetId = `SB-${Math.floor(10000 + Math.random() * 90000)}-WEB`;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'DISPATCHED',
        packet_id: packetId,
        message: 'SOS packet queued into National Crisis Dispatch & Volunteer Mesh.',
        received_at: new Date().toISOString()
      }));
    });
    return;
  }

  // Static File Serving
  let relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  let filePath = path.join(WEB_DIR, relativePath);

  // Security check to avoid directory traversal
  if (!filePath.startsWith(WEB_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA-style routing if file not found
      filePath = path.join(WEB_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[SafeBangla] Web server successfully running at http://0.0.0.0:${PORT}/`);
  console.log(`[SafeBangla] Serving web assets from ${WEB_DIR}`);
});
