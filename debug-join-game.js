#!/usr/bin/env node

/**
 * Debug script to specifically test the join_game handler
 */

const { io } = require('socket.io-client');

const BACKEND_URL = 'https://web-production-4fb4.up.railway.app';

console.log('🔍 Debugging join_game handler');

// First create a real game by connecting two players
const player1 = io(BACKEND_URL);
const player2 = io(BACKEND_URL);

let gameId = null;

player1.on('connect', () => {
  console.log('Player 1 connected:', player1.id);

  player1.emit('authenticate', {
    userId: 'debug-player-1',
    username: 'DebugPlayer1',
    rating: 1200
  });
});

player2.on('connect', () => {
  console.log('Player 2 connected:', player2.id);

  player2.emit('authenticate', {
    userId: 'debug-player-2',
    username: 'DebugPlayer2',
    rating: 1200
  });
});

player1.on('authenticated', () => {
  console.log('Player 1 authenticated');

  player1.emit('join_matchmaking', {
    timeControl: {
      initial: 180,
      increment: 2,
      type: 'blitz'
    }
  });
});

player2.on('authenticated', () => {
  console.log('Player 2 authenticated');

  setTimeout(() => {
    player2.emit('join_matchmaking', {
      timeControl: {
        initial: 180,
        increment: 2,
        type: 'blitz'
      }
    });
  }, 500);
});

player1.on('game_started', (data) => {
  gameId = data.gameId;
  console.log('Game started! Game ID:', gameId);
  console.log('Player 1 color:', data.color);

  // Now test join_game
  setTimeout(() => {
    console.log('\n🎮 Testing join_game event...');
    console.log('Emitting join_game with gameId:', gameId);

    // Listen for ALL events
    player1.onAny((eventName, ...args) => {
      console.log(`📨 Player 1 received event: ${eventName}`, args);
    });

    player1.emit('join_game', { gameId });
  }, 1000);
});

player2.on('game_started', (data) => {
  console.log('Player 2 color:', data.color);

  setTimeout(() => {
    console.log('\n🎮 Testing join_game for Player 2...');

    // Listen for ALL events
    player2.onAny((eventName, ...args) => {
      console.log(`📨 Player 2 received event: ${eventName}`, args);
    });

    player2.emit('join_game', { gameId });
  }, 1500);
});

// Auto-disconnect after 10 seconds
setTimeout(() => {
  console.log('\n🏁 Test complete');
  player1.disconnect();
  player2.disconnect();
  process.exit(0);
}, 10000);