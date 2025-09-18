#!/bin/bash

# Chess Academy Backend Deployment to Render.com
# This script deploys the backend service to Render using the render.yaml configuration

set -e  # Exit on any error

echo "🚀 Starting Chess Academy Backend Deployment to Render.com"
echo "============================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if render CLI is installed
if ! command -v render &> /dev/null; then
    echo -e "${RED}❌ Render CLI not found. Installing...${NC}"
    brew install render
    echo -e "${GREEN}✅ Render CLI installed${NC}"
fi

# Check if user is logged in
echo -e "${BLUE}🔐 Checking authentication...${NC}"
if ! render whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Render. Please authenticate:${NC}"
    echo -e "${BLUE}Run: render login${NC}"
    echo -e "${BLUE}Then re-run this script${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Authenticated with Render${NC}"

# Verify we're in the correct directory
if [ ! -f "render.yaml" ]; then
    echo -e "${RED}❌ render.yaml not found. Make sure you're in the project root directory${NC}"
    exit 1
fi

if [ ! -d "backend" ]; then
    echo -e "${RED}❌ backend directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Project structure verified${NC}"

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  Git working directory is not clean. Uncommitted changes:${NC}"
    git status --short
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo -e "${GREEN}✅ Git status checked${NC}"

# Deploy using render.yaml
echo -e "${BLUE}🚀 Starting deployment...${NC}"
echo -e "${YELLOW}This will create/update the service defined in render.yaml${NC}"

render services up

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment initiated successfully!${NC}"
    echo ""
    echo -e "${BLUE}📋 Next steps:${NC}"
    echo "1. Check deployment status: render services list"
    echo "2. View logs: render logs -s chess-academy-backend"
    echo "3. Get service URL: render services list"
    echo ""
    echo -e "${YELLOW}💡 The deployment may take a few minutes to complete.${NC}"
    echo -e "${YELLOW}💡 Your backend will be available at: https://chess-academy-backend-xxxx.onrender.com${NC}"
else
    echo -e "${RED}❌ Deployment failed. Check the error messages above.${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Deployment script completed!${NC}"