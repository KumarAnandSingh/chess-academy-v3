#!/usr/bin/env node

/**
 * Verify if Railway deployment includes our fixes
 */

const { io } = require('socket.io-client');
const BACKEND_URL = 'https://web-production-4fb4.up.railway.app';

console.log('🔍 Verifying Railway deployment includes our fixes...');

const socket = io(BACKEND_URL);

socket.on('connect', () => {
  console.log('✅ Connected to backend:', socket.id);

  // Test authentication
  socket.emit('authenticate', {
    userId: 'test-deploy-check',
    username: 'DeployTest',
    rating: 1200
  });
});

socket.on('authenticated', (data) => {
  console.log('🔐 Authentication response:', data);

  // Test join_game with non-existent game to see error format
  console.log('🧪 Testing join_game handler...');
  socket.emit('join_game', { gameId: 'non-existent-game' });
});

// Listen for any error response to verify handler exists
socket.on('error', (data) => {
  console.log('📨 Error response (indicates join_game handler exists):', data);
  socket.disconnect();
});

socket.on('join_game_error', (data) => {
  console.log('📨 join_game_error response (NEW HANDLER EXISTS!):', data);
  console.log('✅ Railway deployment includes our reconnect_to_game fix!');
  socket.disconnect();
});

socket.on('game_joined', (data) => {
  console.log('📨 game_joined response (NEW EVENT HANDLER!):', data);
  console.log('✅ Railway deployment includes our join_game fix!');
  socket.disconnect();
});

setTimeout(() => {
  console.log('⚠️ No response from join_game handler - deployment may not include fixes');
  socket.disconnect();
}, 5000);