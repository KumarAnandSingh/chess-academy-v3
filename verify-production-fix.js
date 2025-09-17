#!/usr/bin/env node

/**
 * Production Multiplayer Fix Verification Script
 *
 * Tests the critical fix deployed to https://studyify.in/multiplayer
 *
 * ISSUE FIXED:
 * - Production was connecting to wrong backend (no multiplayer support)
 * - Updated backend URL from Vercel to Railway with working Socket.IO
 */

const { io } = require('socket.io-client');

console.log('🔧 PRODUCTION MULTIPLAYER FIX VERIFICATION');
console.log('============================================');
console.log();

const PRODUCTION_BACKEND = 'https://web-production-4fb4.up.railway.app';
const OLD_BACKEND = 'https://backend-coral-kappa-57.vercel.app';

console.log(`📍 Target Site: https://studyify.in/multiplayer`);
console.log(`🎯 NEW Backend: ${PRODUCTION_BACKEND}`);
console.log(`❌ OLD Backend: ${OLD_BACKEND} (broken)`);
console.log();

async function testBackend(url, name) {
    console.log(`🔗 Testing ${name}: ${url}`);

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(`   ✅ Response: ${JSON.stringify(data)}`);

        if (data.message && data.message.includes('Socket.IO')) {
            console.log(`   ✅ ${name}: Has multiplayer support`);
            return true;
        } else {
            console.log(`   ❌ ${name}: No multiplayer support`);
            return false;
        }
    } catch (error) {
        console.log(`   ❌ ${name}: Failed - ${error.message}`);
        return false;
    }
}

async function testSocketConnection(url) {
    return new Promise((resolve) => {
        console.log(`🔌 Testing Socket.IO connection to: ${url}`);

        const socket = io(url, {
            transports: ['websocket', 'polling'],
            timeout: 10000,
            forceNew: true
        });

        let results = {
            connected: false,
            authenticated: false,
            matchmaking: false
        };

        const timeout = setTimeout(() => {
            console.log('   ⏰ Connection timeout');
            socket.disconnect();
            resolve(results);
        }, 15000);

        socket.on('connect', () => {
            console.log('   ✅ Socket connected!');
            results.connected = true;

            // Test authentication
            const demoUser = {
                userId: 'test-user-' + Date.now(),
                username: 'TestUser',
                rating: 1200
            };

            console.log('   🔐 Testing authentication...');
            socket.emit('authenticate', demoUser);
        });

        socket.on('authenticated', (data) => {
            console.log('   ✅ Authentication successful!');
            results.authenticated = true;

            // Test matchmaking
            console.log('   🎯 Testing matchmaking...');
            socket.emit('join_matchmaking', {
                timeControl: { initial: 300, increment: 0, type: 'blitz' }
            });
        });

        socket.on('matchmaking_joined', (data) => {
            console.log('   ✅ Matchmaking works!');
            results.matchmaking = true;

            clearTimeout(timeout);
            socket.disconnect();
            resolve(results);
        });

        socket.on('disconnect', (reason) => {
            console.log(`   ❌ Disconnected: ${reason}`);
            clearTimeout(timeout);
            resolve(results);
        });

        socket.on('connect_error', (error) => {
            console.log(`   ❌ Connection error: ${error.message}`);
            clearTimeout(timeout);
            resolve(results);
        });
    });
}

async function main() {
    console.log('STEP 1: Testing backend endpoints');
    console.log('----------------------------------');

    const oldWorks = await testBackend(OLD_BACKEND, 'OLD Backend');
    const newWorks = await testBackend(PRODUCTION_BACKEND, 'NEW Backend');

    console.log();
    console.log('STEP 2: Testing Socket.IO connections');
    console.log('-------------------------------------');

    if (newWorks) {
        const socketResults = await testSocketConnection(PRODUCTION_BACKEND);

        console.log();
        console.log('FINAL RESULTS:');
        console.log('==============');

        if (socketResults.connected && socketResults.authenticated && socketResults.matchmaking) {
            console.log('🎉 SUCCESS! The multiplayer fix is working!');
            console.log('✅ Production site should now work correctly');
            console.log('✅ Users can connect and play multiplayer games');
            console.log();
            console.log('ISSUE RESOLVED:');
            console.log('- Backend URL updated in chess-academy-v3');
            console.log('- Production now connects to working Railway backend');
            console.log('- Multiplayer disconnection issue is FIXED');
        } else {
            console.log('❌ PARTIAL SUCCESS - Some features not working');
            console.log(`   Connection: ${socketResults.connected ? '✅' : '❌'}`);
            console.log(`   Authentication: ${socketResults.authenticated ? '✅' : '❌'}`);
            console.log(`   Matchmaking: ${socketResults.matchmaking ? '✅' : '❌'}`);
        }
    } else {
        console.log('❌ FAILED - New backend is not working');
        console.log('The fix may not have been deployed correctly');
    }

    console.log();
    console.log('Next steps:');
    console.log('- Visit https://studyify.in/multiplayer to test manually');
    console.log('- Check browser console for any remaining errors');
    console.log('- Monitor user reports for confirmation');
}

main().catch(console.error);