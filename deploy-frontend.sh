#!/bin/bash

# Automated Frontend Deployment Script

echo "🚀 Starting frontend deployment to Vercel..."

cd frontend

# Build the project
echo "🔨 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please check the logs above."
    exit 1
fi

echo "✅ Build successful!"

# Deploy to Vercel
echo "🌐 Deploying to Vercel production..."
vercel --prod --yes

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Frontend deployed to production!"
    echo "🔗 Your app should now be live at: https://studyify.in"
    echo ""
    echo "🧪 Test your multiplayer chess:"
    echo "1. Go to https://studyify.in/multiplayer"
    echo "2. Try to join a game"
    echo "3. Check if everything works end-to-end"
else
    echo "❌ Deployment failed! Please check the logs above."
    exit 1
fi