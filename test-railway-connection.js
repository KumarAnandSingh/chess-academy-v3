#!/usr/bin/env node

/**
 * Test Railway Backend Connection
 * Tests the current Railway deployment to verify functionality
 */

import { io } from 'socket.io-client';

const RAILWAY_URL = 'https://web-production-4fb4.up.railway.app';

console.log('🧪 Testing Railway backend connection...');
console.log(`📡 Connecting to: ${RAILWAY_URL}`);

// Test HTTP endpoint first
console.log('\n📋 Testing HTTP endpoint...');
fetch(RAILWAY_URL)
  .then(response => response.json())
  .then(data => {
    console.log('✅ HTTP Response:', data);
    console.log(`🎮 Active Games: ${data.activeGames}`);
    console.log(`👥 Connected Players: ${data.connectedPlayers}`);
    console.log(`⏳ Matchmaking Queue: ${data.matchmakingQueue}`);

    // Test Socket.IO connection
    console.log('\n🔌 Testing Socket.IO connection...');

    const socket = io(RAILWAY_URL, {
      transports: ['polling', 'websocket'],
      timeout: 10000
    });

    socket.on('connect', () => {
      console.log('✅ Socket.IO connected successfully!');
      console.log(`🆔 Socket ID: ${socket.id}`);

      // Test authentication
      console.log('\n🔐 Testing authentication...');
      socket.emit('authenticate', {
        userId: 'test-user-' + Date.now(),
        username: 'TestUser',
        rating: 1200
      });
    });

    socket.on('authenticated', (data) => {
      console.log('✅ Authentication successful!', data);

      // Test matchmaking
      console.log('\n🎯 Testing matchmaking...');
      socket.emit('join_matchmaking', {
        timeControl: {
          type: 'blitz',
          initial: 300,
          increment: 3
        }
      });
    });

    socket.on('matchmaking_joined', (data) => {
      console.log('✅ Joined matchmaking queue!', data);

      setTimeout(() => {
        console.log('\n🏁 Test completed successfully!');
        console.log('✅ Railway backend is functioning correctly');
        socket.disconnect();
        process.exit(0);
      }, 2000);
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket.IO connection error:', error.message);
      process.exit(1);
    });

    socket.on('error', (error) => {
      console.error('❌ Socket error:', error);
    });

    // Timeout after 15 seconds
    setTimeout(() => {
      console.error('❌ Test timeout - Railway backend may not be functioning correctly');
      socket.disconnect();
      process.exit(1);
    }, 15000);

  })
  .catch(error => {
    console.error('❌ HTTP endpoint test failed:', error.message);
    console.error('❌ Railway backend is not responding correctly');
    process.exit(1);
  });