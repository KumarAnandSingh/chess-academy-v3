#!/usr/bin/env node

/**
 * Complete User Journey Test for Multiplayer Chess
 *
 * This script simulates the complete user journey to verify the fix:
 * 1. Two players connect to lobby
 * 2. Players authenticate
 * 3. Players join matchmaking
 * 4. Backend creates a game and emits game_started
 * 5. Players navigate to game page (simulated by join_game event)
 * 6. Backend responds with game_joined
 * 7. Players can make moves
 * 8. Test reconnection scenarios
 */

const { io } = require('socket.io-client');

const BACKEND_URL = 'https://web-production-4fb4.up.railway.app';
const TEST_TIMEOUT = 15000;

console.log('🎯 Complete User Journey Test');
console.log('🧪 Testing the full multiplayer chess flow');
console.log('🚀 Backend URL:', BACKEND_URL);
console.log('─'.repeat(60));

class UserJourneyTester {
  constructor() {
    this.player1 = null;
    this.player2 = null;
    this.gameId = null;
    this.player1Info = null;
    this.player2Info = null;
  }

  async runCompleteTest() {
    try {
      console.log('👥 Step 1: Connect two players');
      await this.connectPlayers();

      console.log('🔐 Step 2: Authenticate both players');
      await this.authenticatePlayers();

      console.log('🎯 Step 3: Start matchmaking');
      await this.startMatchmaking();

      console.log('🎮 Step 4: Test game joining (THE CRITICAL FIX)');
      await this.testGameJoining();

      console.log('♟️ Step 5: Test game moves');
      await this.testGameMoves();

      console.log('🔄 Step 6: Test reconnection');
      await this.testReconnection();

      console.log('✅ COMPLETE USER JOURNEY SUCCESSFUL!');
      console.log('🎉 The multiplayer chess disconnection issue has been RESOLVED!');

    } catch (error) {
      console.error('❌ User journey test failed:', error.message);
      console.error('🔍 The fix may need further adjustment.');
    } finally {
      if (this.player1) this.player1.disconnect();
      if (this.player2) this.player2.disconnect();
    }
  }

  connectPlayers() {
    return new Promise((resolve, reject) => {
      let connectedCount = 0;
      const timeout = setTimeout(() => {
        reject(new Error('Player connection timeout'));
      }, TEST_TIMEOUT);

      const checkBothConnected = () => {
        connectedCount++;
        if (connectedCount === 2) {
          clearTimeout(timeout);
          console.log('  ✅ Both players connected');
          resolve();
        }
      };

      // Connect Player 1
      this.player1 = io(BACKEND_URL, {
        transports: ['polling', 'websocket'],
        timeout: 5000
      });

      this.player1.on('connect', () => {
        console.log('  👤 Player 1 connected:', this.player1.id);
        checkBothConnected();
      });

      // Connect Player 2
      this.player2 = io(BACKEND_URL, {
        transports: ['polling', 'websocket'],
        timeout: 5000
      });

      this.player2.on('connect', () => {
        console.log('  👤 Player 2 connected:', this.player2.id);
        checkBothConnected();
      });

      this.player1.on('connect_error', (error) => {
        clearTimeout(timeout);
        reject(new Error(`Player 1 connection error: ${error.message}`));
      });

      this.player2.on('connect_error', (error) => {
        clearTimeout(timeout);
        reject(new Error(`Player 2 connection error: ${error.message}`));
      });
    });
  }

  authenticatePlayers() {
    return new Promise((resolve, reject) => {
      let authenticatedCount = 0;
      const timeout = setTimeout(() => {
        reject(new Error('Authentication timeout'));
      }, TEST_TIMEOUT);

      const checkBothAuthenticated = () => {
        authenticatedCount++;
        if (authenticatedCount === 2) {
          clearTimeout(timeout);
          console.log('  ✅ Both players authenticated');
          resolve();
        }
      };

      // Authenticate Player 1
      this.player1.on('authenticated', (data) => {
        if (data.success) {
          this.player1Info = data.playerInfo;
          console.log('  🔐 Player 1 authenticated:', data.playerInfo.username);
          checkBothAuthenticated();
        }
      });

      // Authenticate Player 2
      this.player2.on('authenticated', (data) => {
        if (data.success) {
          this.player2Info = data.playerInfo;
          console.log('  🔐 Player 2 authenticated:', data.playerInfo.username);
          checkBothAuthenticated();
        }
      });

      this.player1.emit('authenticate', {
        userId: 'test-player-1-' + Date.now(),
        username: 'TestPlayer1',
        rating: 1200
      });

      this.player2.emit('authenticate', {
        userId: 'test-player-2-' + Date.now(),
        username: 'TestPlayer2',
        rating: 1250
      });
    });
  }

  startMatchmaking() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Matchmaking timeout - no game_started event'));
      }, TEST_TIMEOUT);

      // Player 1 listens for game_started
      this.player1.on('game_started', (data) => {
        clearTimeout(timeout);
        this.gameId = data.gameId;
        console.log('  ✅ Game started! Game ID:', this.gameId);
        console.log('  🎨 Player 1 color:', data.color);
        console.log('  👥 Opponent:', data.opponent.username);
        resolve();
      });

      // Player 2 should also receive game_started
      this.player2.on('game_started', (data) => {
        console.log('  🎨 Player 2 color:', data.color);
        console.log('  👥 Opponent:', data.opponent.username);
      });

      // Start matchmaking for both players
      const timeControl = {
        initial: 180, // 3 minutes
        increment: 2,
        type: 'blitz'
      };

      console.log('  🎯 Player 1 joining matchmaking...');
      this.player1.emit('join_matchmaking', { timeControl });

      // Slight delay for player 2 to simulate real-world timing
      setTimeout(() => {
        console.log('  🎯 Player 2 joining matchmaking...');
        this.player2.emit('join_matchmaking', { timeControl });
      }, 500);
    });
  }

  testGameJoining() {
    return new Promise((resolve, reject) => {
      let joinedCount = 0;
      const timeout = setTimeout(() => {
        reject(new Error('Game joining timeout - CRITICAL FIX NOT WORKING'));
      }, TEST_TIMEOUT);

      const checkBothJoined = () => {
        joinedCount++;
        if (joinedCount === 2) {
          clearTimeout(timeout);
          console.log('  ✅ CRITICAL FIX VERIFIED: Both players successfully joined the game!');
          console.log('  🎉 No disconnection after game_started → join_game flow!');
          resolve();
        }
      };

      // Player 1 listens for game_joined response
      this.player1.on('game_joined', (data) => {
        if (data.success) {
          console.log('  ✅ Player 1 successfully joined game');
          console.log('  🎮 Game state received for Player 1');
          checkBothJoined();
        } else {
          clearTimeout(timeout);
          reject(new Error('Player 1 failed to join game: ' + data.message));
        }
      });

      // Player 2 listens for game_joined response
      this.player2.on('game_joined', (data) => {
        if (data.success) {
          console.log('  ✅ Player 2 successfully joined game');
          console.log('  🎮 Game state received for Player 2');
          checkBothJoined();
        } else {
          clearTimeout(timeout);
          reject(new Error('Player 2 failed to join game: ' + data.message));
        }
      });

      // Simulate navigation to game page by emitting join_game
      console.log('  🎮 Player 1 navigating to game page (join_game)...');
      this.player1.emit('join_game', { gameId: this.gameId });

      setTimeout(() => {
        console.log('  🎮 Player 2 navigating to game page (join_game)...');
        this.player2.emit('join_game', { gameId: this.gameId });
      }, 200);
    });
  }

  testGameMoves() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Move testing timeout'));
      }, TEST_TIMEOUT);

      // Player 2 listens for move from Player 1
      this.player2.on('move_made', (data) => {
        clearTimeout(timeout);
        console.log('  ✅ Move successfully transmitted between players');
        console.log('  ♟️ Move:', data.lastMove);
        console.log('  🎮 Game continues normally after join fix');
        resolve();
      });

      // Player 1 makes the first move (e2-e4)
      setTimeout(() => {
        console.log('  ♟️ Player 1 making move: e2-e4');
        this.player1.emit('make_move', {
          gameId: this.gameId,
          move: {
            from: 'e2',
            to: 'e4'
          },
          timeLeft: 180000 // 3 minutes
        });
      }, 1000);
    });
  }

  testReconnection() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Reconnection test timeout'));
      }, TEST_TIMEOUT);

      // Create a new socket to simulate reconnection
      const reconnectingPlayer = io(BACKEND_URL, {
        transports: ['polling', 'websocket'],
        timeout: 5000
      });

      reconnectingPlayer.on('connect', () => {
        console.log('  🔄 Reconnecting player connected');

        // Authenticate first
        reconnectingPlayer.emit('authenticate', {
          userId: this.player1Info.userId, // Same user ID as Player 1
          username: this.player1Info.username,
          rating: this.player1Info.rating
        });

        reconnectingPlayer.on('authenticated', (data) => {
          if (data.success) {
            console.log('  🔐 Reconnecting player authenticated');

            // Test reconnect_to_game
            reconnectingPlayer.emit('reconnect_to_game', { gameId: this.gameId });
          }
        });

        reconnectingPlayer.on('game_rejoined', (data) => {
          clearTimeout(timeout);
          if (data.success) {
            console.log('  ✅ Reconnection successful!');
            console.log('  🎮 Game state restored for reconnecting player');
            reconnectingPlayer.disconnect();
            resolve();
          } else {
            reject(new Error('Reconnection failed: ' + data.message));
          }
        });
      });

      reconnectingPlayer.on('connect_error', (error) => {
        clearTimeout(timeout);
        reject(new Error(`Reconnection error: ${error.message}`));
      });
    });
  }
}

// Run the complete test
const tester = new UserJourneyTester();
tester.runCompleteTest().catch(console.error);