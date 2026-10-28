const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 8080;
const APP_ENV = process.env.APP_ENV || 'production';
const APP_MESSAGE = process.env.APP_MESSAGE || 'Kubernetes Implemented Through Jenkins Lab';
const APP_VERSION = process.env.APP_VERSION || '1.0.0';

let isReady = true;

const server = http.createServer((req, res) => {
    // Health / Readiness Probe Endpoint
    if (req.url === '/healthz' || req.url === '/ready') {
        if (isReady) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ status: 'UP', ready: true, uptime: process.uptime() }));
        } else {
            res.writeHead(503, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ status: 'DOWN', ready: false }));
        }
    }

    // Toggle Readiness (for testing probe failure detection in Set 10/14)
    if (req.url === '/toggle-ready') {
        isReady = !isReady;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ isReady }));
    }

    // API Info Endpoint (useful for ConfigMap & Pod inspection in Set 8)
    if (req.url === '/api/info') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            app: 'Agile DevOps Kubernetes WebApp',
            version: APP_VERSION,
            environment: APP_ENV,
            message: APP_MESSAGE,
            hostname: os.hostname(),
            platform: os.platform(),
            nodeVersion: process.version,
            timestamp: new Date().toISOString()
        }, null, 2));
    }

    // Static Webpage
    const filePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(`
                <!DOCTYPE html>
                <html>
                <head><title>DevOps K8s App</title></head>
                <body style="font-family: sans-serif; text-align: center; padding: 40px;">
                    <h1>🚀 Kubernetes Implemented Through Jenkins</h1>
                    <p>Pod Hostname: <b>${os.hostname()}</b></p>
                    <p>Message: <b>${APP_MESSAGE}</b></p>
                    <p>Version: <b>${APP_VERSION}</b></p>
                </body>
                </html>
            `);
        }
        // Interpolate server variables into HTML
        const rendered = content
            .replace(/{{APP_VERSION}}/g, APP_VERSION)
            .replace(/{{HOSTNAME}}/g, os.hostname())
            .replace(/{{APP_ENV}}/g, APP_ENV)
            .replace(/{{APP_MESSAGE}}/g, APP_MESSAGE);

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(rendered);
    });
});

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`[DevOps K8s WebApp] Server running on port ${PORT}`);
        console.log(`[DevOps K8s WebApp] Environment: ${APP_ENV}, Version: ${APP_VERSION}`);
        console.log(`[DevOps K8s WebApp] Hostname: ${os.hostname()}`);
    });
}

module.exports = server;
