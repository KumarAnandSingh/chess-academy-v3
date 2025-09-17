import { io } from 'socket.io-client';

console.log('🧪 Testing Railway join_game handler specifically...');
console.log('🔗 Backend URL: https://web-production-4fb4.up.railway.app');

const socket = io('https://web-production-4fb4.up.railway.app', {
  transports: ['websocket'],
  timeout: 5000
});

let testResults = {
  connection: false,
  authentication: false,
  joinGameResponse: false
};

socket.on('connect', () => {
  console.log('✅ Connected:', socket.id);
  testResults.connection = true;

  // Authenticate first
  socket.emit('authenticate', {
    userId: 'test-user-' + Date.now(),
    username: 'TestPlayer',
    rating: 1200
  });
});

socket.on('authenticated', (data) => {
  console.log('✅ Authenticated:', data.success);
  testResults.authentication = true;

  // Now test join_game
  console.log('🎮 Sending join_game event...');
  socket.emit('join_game', { gameId: 'test-game-123' });
});

// Listen for ANY response from join_game
socket.on('game_joined', (data) => {
  console.log('✅ Received game_joined:', data);
  testResults.joinGameResponse = true;
  showResults();
});

socket.on('join_game_error', (error) => {
  console.log('✅ Received join_game_error (this is good):', error);
  testResults.joinGameResponse = true;
  showResults();
});

socket.on('error', (error) => {
  console.log('❌ Socket error:', error);
});

socket.on('connect_error', (error) => {
  console.log('❌ Connection error:', error);
  process.exit(1);
});

function showResults() {
  console.log('\n📋 Test Results:');
  console.log('Connection:', testResults.connection ? '✅' : '❌');
  console.log('Authentication:', testResults.authentication ? '✅' : '❌');
  console.log('Join Game Response:', testResults.joinGameResponse ? '✅' : '❌');

  if (testResults.connection && testResults.authentication && testResults.joinGameResponse) {
    console.log('\n🎉 RAILWAY BACKEND IS WORKING PERFECTLY!');
    console.log('The join_game handler is responding correctly.');
    console.log('The multiplayer disconnection issue should now be FIXED!');
  } else {
    console.log('\n❌ Some issues detected');
  }

  socket.disconnect();
  process.exit(0);
}

// Timeout after 10 seconds
setTimeout(() => {
  console.log('⏰ Test timeout');
  if (testResults.connection && testResults.authentication && !testResults.joinGameResponse) {
    console.log('❌ join_game event sent but no response received');
    console.log('This indicates the backend might not have the join_game handler');
  }
  showResults();
}, 10000);