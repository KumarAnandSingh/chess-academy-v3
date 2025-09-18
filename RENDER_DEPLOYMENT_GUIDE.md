# Chess Academy Backend - Render.com Deployment Guide

## 🎯 Overview
This guide will help you deploy the Chess Academy backend to Render.com to replace the failing Railway deployment.

## ✅ Prerequisites Checklist
- [x] Render CLI installed (`brew install render`)
- [x] `render.yaml` configuration file ready
- [x] Backend code with Socket.IO functionality
- [x] Health endpoint at `/health`
- [x] CORS configured for `https://studyify.in`

## 🚀 Quick Deployment (Automated)

### Option 1: Using Deployment Script
```bash
# Run the automated deployment script
./deploy-to-render.sh
```

### Option 2: Manual CLI Deployment
```bash
# 1. Authenticate with Render
render login

# 2. Deploy using render.yaml
render services up

# 3. Check deployment status
render services list

# 4. View logs
render logs -s chess-academy-backend
```

## 🌐 Manual Deployment via Dashboard

If CLI deployment fails, use the Render Dashboard:

1. **Go to** [Render Dashboard](https://dashboard.render.com)
2. **Click** "New +" → "Service"
3. **Connect** your GitHub repository
4. **Configure Service:**
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Health Check Path**: `/health`
   - **Plan**: Free
   - **Region**: Oregon

5. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=(auto-assigned by Render)
   ```

6. **Deploy**

## 📋 Expected Deployment Results

### ✅ Success Indicators
- Service status: "Live"
- Health check: ✅ Passing
- Logs show: "🚀 Server running on port XXXX"
- URL format: `https://chess-academy-backend-xxxx.onrender.com`

### 🔍 Testing Your Deployment

#### 1. Health Check Test
```bash
curl https://your-service-url.onrender.com/health
# Expected response: {"status":"ok","timestamp":"..."}
```

#### 2. Socket.IO Connection Test
```javascript
// Test in browser console at https://studyify.in
const socket = io('https://your-service-url.onrender.com');
socket.on('connect', () => console.log('✅ Connected to backend'));
socket.on('disconnect', () => console.log('❌ Disconnected'));
```

## 🔧 Post-Deployment Configuration

### Update Frontend Environment Variables

1. **Update Vercel Environment Variables:**
   ```bash
   # Using Vercel CLI
   vercel env add VITE_BACKEND_URL production
   # Value: https://your-service-url.onrender.com

   # Or update in Vercel Dashboard:
   # Settings → Environment Variables → Edit VITE_BACKEND_URL
   ```

2. **Redeploy Frontend:**
   ```bash
   vercel --prod
   ```

### Verify Full Stack Integration
```bash
# Run the test script
node test-production-integration.js
```

## 🔍 Monitoring & Debugging

### View Logs
```bash
render logs -s chess-academy-backend --tail
```

### Check Service Status
```bash
render services list
```

### Common Issues & Solutions

#### Issue: Build Failed
**Solution:** Check if `package.json` exists in `/backend` directory
```bash
ls -la backend/package.json
```

#### Issue: Health Check Failing
**Solution:** Verify health endpoint is responding
```bash
# Test locally first
cd backend && npm start
curl http://localhost:3001/health
```

#### Issue: CORS Errors
**Solution:** Verify CORS configuration includes your frontend domain
```javascript
// In server.js - should include:
origin: ["https://studyify.in", ...]
```

## 📊 Performance Optimization

### Free Tier Limitations
- **Sleeping**: Service sleeps after 15 minutes of inactivity
- **Cold Start**: ~30 seconds to wake up
- **RAM**: 512MB limit
- **Build Time**: 500 build minutes/month

### Optimization Tips
1. **Keep Warm**: Use uptime monitoring (e.g., UptimeRobot)
2. **Optimize Dependencies**: Remove unused packages
3. **Memory Usage**: Monitor with `process.memoryUsage()`

## 🔄 Future Updates

### Automatic Deployment
Connect GitHub repository for auto-deployment on push to main branch.

### Update Deployment
```bash
# Trigger new deployment
render services deploy -s chess-academy-backend

# Or push to connected GitHub branch
git push origin main
```

## 🆘 Troubleshooting

### Deployment Stuck?
```bash
# Cancel and retry
render services deploy -s chess-academy-backend --clear-cache
```

### Service Won't Start?
```bash
# Check build logs
render logs -s chess-academy-backend --type build

# Check runtime logs
render logs -s chess-academy-backend --type deploy
```

### Connection Issues?
1. Verify health endpoint: `/health`
2. Check CORS configuration
3. Confirm Socket.IO version compatibility
4. Test with browser developer tools

## 📞 Support Resources
- [Render Documentation](https://render.com/docs)
- [Render Status Page](https://status.render.com)
- [Community Forum](https://community.render.com)

---

## 🎯 Quick Reference

**Service Name:** `chess-academy-backend`
**Health Check:** `/health`
**Expected URL:** `https://chess-academy-backend-xxxx.onrender.com`
**Frontend Domain:** `https://studyify.in`
**Framework:** Node.js + Express + Socket.IO