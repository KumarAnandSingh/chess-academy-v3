#!/bin/bash

# Update Frontend Backend URL Script
# Usage: ./update-frontend-backend-url.sh "https://your-render-url.onrender.com"

if [ $# -eq 0 ]; then
    echo "❌ Error: Please provide the Render backend URL"
    echo "Usage: $0 \"https://chess-academy-backend-xxxx.onrender.com\""
    exit 1
fi

BACKEND_URL="$1"

echo "🔄 Updating frontend to use backend URL: $BACKEND_URL"

# Update .env.production file
cat > frontend/.env.production << EOF
# Production Environment Variables
VITE_API_URL=https://www.studyify.in/api
VITE_BACKEND_URL=$BACKEND_URL
VITE_GA_MEASUREMENT_ID=G-TG7J1D38B6
VITE_GA_DEBUG_MODE=false
VITE_ENABLE_ANALYTICS=true
EOF

echo "✅ Updated frontend/.env.production"
echo "📁 New backend URL: $BACKEND_URL"

# Test the backend URL
echo "🧪 Testing backend health..."
if curl -s "$BACKEND_URL/health" | grep -q "OK"; then
    echo "✅ Backend is healthy and responding!"
else
    echo "⚠️  Backend may not be ready yet. Please wait a moment and try again."
fi

echo ""
echo "🚀 Next steps:"
echo "1. cd frontend"
echo "2. npm run build"
echo "3. vercel --prod"
echo ""
echo "Or run the automated deployment:"
echo "./deploy-frontend.sh"