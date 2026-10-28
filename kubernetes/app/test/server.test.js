const http = require('http');
const server = require('../server');

const TEST_PORT = 9999;

server.listen(TEST_PORT, () => {
    console.log(`[Test Runner] Started test server on port ${TEST_PORT}`);

    // Test 1: Check /healthz
    http.get(`http://localhost:${TEST_PORT}/healthz`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            if (res.statusCode !== 200) {
                console.error(`❌ Test 1 Failed: Expected status 200, got ${res.statusCode}`);
                process.exit(1);
            }
            console.log('✅ Test 1 Passed: /healthz returned HTTP 200 OK');

            // Test 2: Check /api/info
            http.get(`http://localhost:${TEST_PORT}/api/info`, (resInfo) => {
                let infoData = '';
                resInfo.on('data', chunk => infoData += chunk);
                resInfo.on('end', () => {
                    if (resInfo.statusCode !== 200) {
                        console.error(`❌ Test 2 Failed: Expected status 200, got ${resInfo.statusCode}`);
                        process.exit(1);
                    }
                    const parsed = JSON.parse(infoData);
                    if (!parsed.version || !parsed.app) {
                        console.error('❌ Test 2 Failed: /api/info missing version or app fields');
                        process.exit(1);
                    }
                    console.log('✅ Test 2 Passed: /api/info returned valid JSON payload');
                    console.log('🎉 ALL UNIT TESTS PASSED SUCCESSFULLY!');
                    server.close(() => process.exit(0));
                });
            }).on('error', (err) => {
                console.error(`❌ Test 2 Connection Error: ${err.message}`);
                process.exit(1);
            });
        });
    }).on('error', (err) => {
        console.error(`❌ Test 1 Connection Error: ${err.message}`);
        process.exit(1);
    });
});
