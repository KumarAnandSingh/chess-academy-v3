#!/bin/bash

# Update Frontend Backend URL Script
# This script updates the frontend environment variables with the new Render backend URL

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Chess Academy Frontend Backend URL Update${NC}"
echo "=============================================="

# Check if URL is provided
if [ -z "$1" ]; then
    echo -e "${RED}❌ Backend URL is required${NC}"
    echo ""
    echo "Usage:"
    echo "  $0 <RENDER_BACKEND_URL>"
    echo ""
    echo "Example:"
    echo "  $0 https://chess-academy-backend-xyz.onrender.com"
    exit 1
fi

BACKEND_URL="$1"
echo -e "${BLUE}📍 New backend URL: ${BACKEND_URL}${NC}"

# Validate URL format
if [[ ! $BACKEND_URL =~ ^https?:// ]]; then
    echo -e "${RED}❌ Invalid URL format. Must start with http:// or https://${NC}"
    exit 1
fi

# Check if Vercel CLI is available
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Check if user is logged in to Vercel
echo -e "${BLUE}🔐 Checking Vercel authentication...${NC}"
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Vercel. Please authenticate:${NC}"
    echo -e "${BLUE}Run: vercel login${NC}"
    echo -e "${BLUE}Then re-run this script${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Authenticated with Vercel${NC}"

# Update environment variable
echo -e "${BLUE}🔄 Updating VITE_BACKEND_URL environment variable...${NC}"

# Remove existing environment variable if it exists
vercel env rm VITE_BACKEND_URL production --yes 2>/dev/null || true

# Add new environment variable
echo "$BACKEND_URL" | vercel env add VITE_BACKEND_URL production

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Environment variable updated successfully${NC}"
else
    echo -e "${RED}❌ Failed to update environment variable${NC}"
    exit 1
fi

# Trigger new deployment
echo -e "${BLUE}🚀 Triggering frontend deployment...${NC}"
vercel --prod

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend deployment triggered successfully${NC}"
    echo ""
    echo -e "${BLUE}📋 Next steps:${NC}"
    echo "1. Wait for deployment to complete (~2-3 minutes)"
    echo "2. Test the connection at https://studyify.in"
    echo "3. Verify multiplayer functionality works"
    echo ""
    echo -e "${YELLOW}💡 Check deployment status: vercel ls${NC}"
else
    echo -e "${RED}❌ Frontend deployment failed${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Backend URL update completed!${NC}"