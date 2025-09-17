import { io } from 'socket.io-client';

console.log('🧪 Testing LOCAL backend with fixes...');
console.log('🔗 Backend URL: http://localhost:8888');

// Test HTTP endpoint first
try {
  const response = await fetch('http://localhost:8888/');
  const data = await response.json();
  console.log('✅ Local HTTP endpoint working:', data);
} catch (error) {
  console.log('❌ Local HTTP endpoint failed:', error.message);
  process.exit(1);
}

// Test Socket.IO connection
const socket = io('http://localhost:8888', {
  transports: ['websocket'],
  timeout: 5000
});

let testResults = {
  connection: false,
  authentication: false,
  joinGame: false,
  disconnect: false
};

// Test connection
socket.on('connect', () => {
  console.log('✅ Socket.IO connected:', socket.id);
  testResults.connection = true;

  // Test authentication
  socket.emit('authenticate', {
    userId: 'test-user-' + Date.now(),
    username: 'TestPlayer',
    rating: 1200
  });
});

socket.on('authenticated', (data) => {
  console.log('✅ Authentication successful:', data);
  testResults.authentication = true;

  // Test join_game event handler exists
  setTimeout(() => {
    console.log('🎮 Testing join_game event handler...');
    socket.emit('join_game', { gameId: 'test-game-123' });
  }, 1000);
});

socket.on('game_joined', (data) => {
  console.log('✅ join_game handler working - received game_joined:', data);
  testResults.joinGame = true;
  socket.disconnect();
});

socket.on('join_game_error', (error) => {
  console.log('⚠️ join_game_error (expected for non-existent game):', error);
  testResults.joinGame = true; // This is actually expected behavior
  socket.disconnect();
});

socket.on('disconnect', () => {
  console.log('✅ Socket disconnected');
  testResults.disconnect = true;

  // Show final results
  setTimeout(() => {
    console.log('\n📋 Test Results:');
    console.log('Connection:', testResults.connection ? '✅' : '❌');
    console.log('Authentication:', testResults.authentication ? '✅' : '❌');
    console.log('Join Game Handler:', testResults.joinGame ? '✅' : '❌');
    console.log('Disconnect:', testResults.disconnect ? '✅' : '❌');

    if (testResults.connection && testResults.authentication && testResults.joinGame) {
      console.log('\n🎉 LOCAL BACKEND FIXES ARE WORKING!');
      console.log('Now we just need to get the Railway URL and update the frontend.');
    } else {
      console.log('\n❌ Backend still has issues');
    }

    process.exit(0);
  }, 1000);
});

socket.on('connect_error', (error) => {
  console.log('❌ Connection failed:', error.message);
  process.exit(1);
});

// Timeout after 10 seconds
setTimeout(() => {
  console.log('⏰ Test timeout - disconnecting');
  socket.disconnect();
  process.exit(1);
}, 10000);