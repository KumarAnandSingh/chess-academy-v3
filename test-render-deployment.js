#!/usr/bin/env node

/**
 * Test script for Chess Academy Backend deployed on Render.com
 * This script verifies the backend functionality after deployment
 */

const https = require('https');
const http = require('http');

// Test configuration
const TEST_CONFIG = {
  // Update this URL after deployment
  BACKEND_URL: process.env.RENDER_BACKEND_URL || 'https://chess-academy-backend-xxxx.onrender.com',
  TIMEOUT: 30000, // 30 seconds
  FRONTEND_DOMAIN: 'https://studyify.in'
};

console.log('🧪 Chess Academy Backend - Render Deployment Test');
console.log('==================================================');
console.log(`📍 Testing backend: ${TEST_CONFIG.BACKEND_URL}`);
console.log(`🌐 Frontend domain: ${TEST_CONFIG.FRONTEND_DOMAIN}`);
console.log('');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      timeout: TEST_CONFIG.TIMEOUT,
      headers: {
        'User-Agent': 'Chess-Academy-Test/1.0',
        'Accept': 'application/json',
        'Origin': TEST_CONFIG.FRONTEND_DOMAIN
      }
    };

    if (data) {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const lib = urlObj.protocol === 'https:' ? https : http;
    const req = lib.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body,
          url: url
        });
      });
    });

    req.on('error', (err) => reject(err));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Request timeout after ${TEST_CONFIG.TIMEOUT}ms`));
    });

    if (data) {
      req.write(data);
    }
    req.end();
  });
}

async function testHealthEndpoint() {
  console.log(colorize('🔍 Testing health endpoint...', 'blue'));

  try {
    const response = await makeRequest(`${TEST_CONFIG.BACKEND_URL}/health`);

    if (response.statusCode === 200) {
      console.log(colorize('✅ Health check passed', 'green'));

      try {
        const healthData = JSON.parse(response.body);
        console.log(`   Status: ${healthData.status}`);
        console.log(`   Timestamp: ${healthData.timestamp}`);
        if (healthData.uptime) {
          console.log(`   Uptime: ${healthData.uptime}s`);
        }
      } catch (e) {
        console.log(`   Response: ${response.body}`);
      }

      return true;
    } else {
      console.log(colorize(`❌ Health check failed - Status: ${response.statusCode}`, 'red'));
      console.log(`   Response: ${response.body}`);
      return false;
    }
  } catch (error) {
    console.log(colorize(`❌ Health check error: ${error.message}`, 'red'));
    return false;
  }
}

async function testCORSHeaders() {
  console.log(colorize('🔒 Testing CORS configuration...', 'blue'));

  try {
    const response = await makeRequest(`${TEST_CONFIG.BACKEND_URL}/health`);
    const corsHeader = response.headers['access-control-allow-origin'];

    if (corsHeader) {
      if (corsHeader === '*' || corsHeader.includes('studyify.in')) {
        console.log(colorize('✅ CORS configured correctly', 'green'));
        console.log(`   Access-Control-Allow-Origin: ${corsHeader}`);
        return true;
      } else {
        console.log(colorize('⚠️ CORS may not include frontend domain', 'yellow'));
        console.log(`   Access-Control-Allow-Origin: ${corsHeader}`);
        return false;
      }
    } else {
      console.log(colorize('❌ CORS headers not found', 'red'));
      return false;
    }
  } catch (error) {
    console.log(colorize(`❌ CORS test error: ${error.message}`, 'red'));
    return false;
  }
}

async function testSocketIOEndpoint() {
  console.log(colorize('🔌 Testing Socket.IO endpoint...', 'blue'));

  try {
    // Test the Socket.IO endpoint (should return Socket.IO client script or redirect)
    const response = await makeRequest(`${TEST_CONFIG.BACKEND_URL}/socket.io/`);

    if (response.statusCode === 200 || response.statusCode === 400) {
      console.log(colorize('✅ Socket.IO endpoint responding', 'green'));
      return true;
    } else {
      console.log(colorize(`⚠️ Socket.IO endpoint returned status: ${response.statusCode}`, 'yellow'));
      return false;
    }
  } catch (error) {
    console.log(colorize(`❌ Socket.IO test error: ${error.message}`, 'red'));
    return false;
  }
}

async function testBasicEndpoints() {
  console.log(colorize('📡 Testing basic API endpoints...', 'blue'));

  const endpoints = ['/', '/health'];
  let passedCount = 0;

  for (const endpoint of endpoints) {
    try {
      const response = await makeRequest(`${TEST_CONFIG.BACKEND_URL}${endpoint}`);
      if (response.statusCode < 500) {
        console.log(colorize(`   ✅ ${endpoint} - Status: ${response.statusCode}`, 'green'));
        passedCount++;
      } else {
        console.log(colorize(`   ❌ ${endpoint} - Status: ${response.statusCode}`, 'red'));
      }
    } catch (error) {
      console.log(colorize(`   ❌ ${endpoint} - Error: ${error.message}`, 'red'));
    }
  }

  return passedCount === endpoints.length;
}

async function testPerformance() {
  console.log(colorize('⚡ Testing response time...', 'blue'));

  const startTime = Date.now();
  try {
    await makeRequest(`${TEST_CONFIG.BACKEND_URL}/health`);
    const responseTime = Date.now() - startTime;

    if (responseTime < 1000) {
      console.log(colorize(`✅ Fast response: ${responseTime}ms`, 'green'));
    } else if (responseTime < 5000) {
      console.log(colorize(`⚠️ Slow response: ${responseTime}ms (cold start?)`, 'yellow'));
    } else {
      console.log(colorize(`❌ Very slow response: ${responseTime}ms`, 'red'));
    }

    return responseTime < 10000; // 10s max
  } catch (error) {
    console.log(colorize(`❌ Performance test error: ${error.message}`, 'red'));
    return false;
  }
}

async function runAllTests() {
  console.log(colorize('🚀 Starting deployment verification tests...', 'cyan'));
  console.log('');

  const tests = [
    { name: 'Health Endpoint', fn: testHealthEndpoint },
    { name: 'CORS Configuration', fn: testCORSHeaders },
    { name: 'Socket.IO Endpoint', fn: testSocketIOEndpoint },
    { name: 'Basic Endpoints', fn: testBasicEndpoints },
    { name: 'Performance', fn: testPerformance }
  ];

  const results = [];

  for (const test of tests) {
    try {
      const result = await test.fn();
      results.push({ name: test.name, passed: result });
      console.log('');
    } catch (error) {
      console.log(colorize(`❌ ${test.name} failed with error: ${error.message}`, 'red'));
      results.push({ name: test.name, passed: false });
      console.log('');
    }
  }

  // Summary
  console.log(colorize('📊 Test Results Summary', 'cyan'));
  console.log('========================');

  const passed = results.filter(r => r.passed).length;
  const total = results.length;

  results.forEach(result => {
    const status = result.passed ? colorize('✅ PASS', 'green') : colorize('❌ FAIL', 'red');
    console.log(`${status} ${result.name}`);
  });

  console.log('');
  console.log(`${colorize('Total:', 'bright')} ${passed}/${total} tests passed`);

  if (passed === total) {
    console.log(colorize('🎉 All tests passed! Backend is ready for production.', 'green'));
    console.log('');
    console.log(colorize('Next steps:', 'cyan'));
    console.log('1. Update frontend environment variables with this backend URL');
    console.log('2. Deploy frontend to connect to new backend');
    console.log('3. Monitor deployment for a few minutes to ensure stability');
  } else {
    console.log(colorize('⚠️ Some tests failed. Please review the issues above.', 'yellow'));
    process.exit(1);
  }
}

// Handle command line arguments
if (process.argv.length > 2) {
  TEST_CONFIG.BACKEND_URL = process.argv[2];
}

// Validate URL
try {
  new URL(TEST_CONFIG.BACKEND_URL);
} catch (e) {
  console.log(colorize('❌ Invalid backend URL. Please provide a valid URL.', 'red'));
  console.log('');
  console.log('Usage:');
  console.log('  node test-render-deployment.js [BACKEND_URL]');
  console.log('');
  console.log('Example:');
  console.log('  node test-render-deployment.js https://chess-academy-backend-xyz.onrender.com');
  process.exit(1);
}

// Run tests
runAllTests().catch(error => {
  console.error(colorize(`💥 Test runner failed: ${error.message}`, 'red'));
  process.exit(1);
});