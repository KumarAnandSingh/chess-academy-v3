# Manual Render.com Deployment Instructions

Since the CLI authentication timed out, please follow these steps to deploy manually through the Render Dashboard:

## 🚀 Step-by-Step Manual Deployment

### 1. Access Render Dashboard
1. Go to [https://dashboard.render.com](https://dashboard.render.com)
2. Sign in to your Render account (or create one if needed)

### 2. Create New Service
1. Click **"New +"** button in the top-right corner
2. Select **"Web Service"**

### 3. Connect Repository
1. **Connect your GitHub account** if not already connected
2. **Search and select** your repository: `chess-academy-v3`
3. Click **"Connect"**

### 4. Configure Service Settings
Fill in these exact settings:

**Basic Information:**
- **Name**: `chess-academy-backend`
- **Region**: `Oregon (US West)`
- **Branch**: `main`

**Build & Deploy:**
- **Runtime**: `Node`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`

**Advanced Settings:**
- **Root Directory**: Leave empty (uses project root)
- **Health Check Path**: `/health`

### 5. Environment Variables
Add these environment variables:
- **NODE_ENV**: `production`
- **PORT**: Leave empty (Render auto-assigns)

### 6. Plan Selection
- **Plan**: `Free` (for testing, upgrade later if needed)

### 7. Deploy
1. Click **"Create Web Service"**
2. Wait for deployment to complete (5-10 minutes)

## ✅ Expected Results

After successful deployment, you should see:

1. **Service Status**: "Live" (green indicator)
2. **Service URL**: Something like `https://chess-academy-backend-xxxx.onrender.com`
3. **Health Check**: Passing (green checkmark)

## 🧪 Test Your Deployment

Once deployed, copy the service URL and run:

```bash
# Replace with your actual service URL
node test-render-deployment.js https://chess-academy-backend-xxxx.onrender.com
```

## 🔧 Update Frontend

After successful backend deployment, update the frontend:

```bash
# Replace with your actual service URL
./update-frontend-backend-url.sh https://chess-academy-backend-xxxx.onrender.com
```

## 🔍 Troubleshooting

### Build Fails
- Check that `backend/package.json` exists
- Verify build command: `cd backend && npm install`

### Service Won't Start
- Check logs in Render Dashboard
- Verify start command: `cd backend && npm start`
- Ensure health endpoint `/health` is responding

### Health Check Fails
- Check that server is listening on the PORT environment variable
- Verify `/health` endpoint returns 200 status

## 📊 Monitor Deployment

In the Render Dashboard, you can:
- **View Logs**: Real-time deployment and runtime logs
- **Check Metrics**: CPU, memory usage
- **Configure Alerts**: Get notified of issues

## 🎯 Final Verification

1. ✅ Backend deployed and live
2. ✅ Health check passing
3. ✅ Test script passes all tests
4. ✅ Frontend updated with new backend URL
5. ✅ Full-stack integration working at https://studyify.in

---

**After deployment, please provide the service URL so we can complete the frontend integration!**