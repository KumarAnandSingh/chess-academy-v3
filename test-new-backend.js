#!/usr/bin/env node

// Quick test script for the new backend deployment
// Usage: node test-new-backend.js https://your-render-url.onrender.com

const backendUrl = process.argv[2];

if (!backendUrl) {
  console.log('❌ Error: Please provide the backend URL');
  console.log('Usage: node test-new-backend.js https://chess-academy-backend-xxxx.onrender.com');
  process.exit(1);
}

console.log('🧪 Testing backend deployment:', backendUrl);

// Test health endpoint
async function testBackend() {
  try {
    console.log('\n1. 🔍 Testing health endpoint...');

    const healthResponse = await fetch(`${backendUrl}/health`);
    const healthData = await healthResponse.json();

    if (healthData.status === 'OK' && healthData.healthy) {
      console.log('✅ Health check passed:', healthData);
    } else {
      console.log('❌ Health check failed:', healthData);
      return false;
    }

    console.log('\n2. 🔍 Testing main endpoint...');

    const mainResponse = await fetch(backendUrl);
    const mainData = await mainResponse.json();

    if (mainData.status && mainData.status.includes('Chess Academy')) {
      console.log('✅ Main endpoint working:', mainData);
    } else {
      console.log('❌ Main endpoint failed:', mainData);
      return false;
    }

    console.log('\n🎉 SUCCESS! Backend is fully operational');
    console.log('📝 Next steps:');
    console.log(`   1. Run: ./update-frontend-backend-url.sh "${backendUrl}"`);
    console.log('   2. Run: ./deploy-frontend.sh');
    console.log('   3. Test: https://studyify.in/multiplayer');

    return true;

  } catch (error) {
    console.log('❌ Error testing backend:', error.message);
    console.log('💡 Make sure the backend is fully deployed and accessible');
    return false;
  }
}

// Polyfill for older Node.js versions
if (typeof fetch === 'undefined') {
  console.log('Installing fetch polyfill...');
  const { fetch } = require('undici');
  global.fetch = fetch;
}

testBackend().catch(console.error);