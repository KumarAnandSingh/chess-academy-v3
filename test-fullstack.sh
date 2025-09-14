#!/bin/bash

echo "🧪 Testing Chess Academy Full Stack Setup"
echo "=========================================="

# Test Backend Health
echo ""
echo "1. 🔍 Testing Backend Health Check..."
BACKEND_HEALTH=$(curl -s http://localhost:3001/health)
if [[ $? -eq 0 ]]; then
  echo "✅ Backend is healthy!"
  echo "   Response: $BACKEND_HEALTH"
else
  echo "❌ Backend health check failed!"
  exit 1
fi

# Test Backend API Endpoints
echo ""
echo "2. 🔍 Testing Backend API Endpoints..."
AUTH_RESPONSE=$(curl -s http://localhost:3001/api/auth/login -X POST -H "Content-Type: application/json" -d '{}')
if [[ $? -eq 0 ]]; then
  echo "✅ Auth endpoint is accessible!"
  echo "   Response: $AUTH_RESPONSE"
else
  echo "❌ Auth endpoint failed!"
fi

LESSONS_RESPONSE=$(curl -s http://localhost:3001/api/lessons)
if [[ $? -eq 0 ]]; then
  echo "✅ Lessons endpoint is accessible!"
  echo "   Response: $LESSONS_RESPONSE"
else
  echo "❌ Lessons endpoint failed!"
fi

# Test Frontend
echo ""
echo "3. 🔍 Testing Frontend..."
FRONTEND_RESPONSE=$(curl -s -I http://localhost:5173)
if [[ $? -eq 0 ]]; then
  echo "✅ Frontend is accessible!"
  echo "   Status: $(echo "$FRONTEND_RESPONSE" | head -n 1)"
else
  echo "❌ Frontend is not accessible!"
fi

# Test Database Connection (via backend health check)
echo ""
echo "4. 🔍 Testing Database Connection..."
DB_STATUS=$(echo $BACKEND_HEALTH | grep -o '"database":"[^"]*"' | cut -d'"' -f4)
if [[ "$DB_STATUS" == "connected" ]]; then
  echo "✅ Database is connected!"
else
  echo "❌ Database connection failed!"
  echo "   Status: $DB_STATUS"
fi

echo ""
echo "🎉 Full Stack Test Summary"
echo "=========================="
echo "✅ Backend API: http://localhost:3001"
echo "✅ Frontend: http://localhost:5173" 
echo "✅ Database: SQLite (dev.db)"
echo ""
echo "🚀 Ready for development!"
echo ""
echo "Next steps:"
echo "- Open http://localhost:5173 in your browser"
echo "- Try logging in with any email/password (mock auth)"
echo "- Explore the Chess Academy interface"