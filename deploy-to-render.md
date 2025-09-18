# URGENT: Deploy Chess Academy Backend to Render.com

## IMMEDIATE STEPS (5 minutes):

### 1. Go to Render.com Dashboard
- Visit: https://dashboard.render.com
- Sign in with GitHub account

### 2. Create New Web Service
- Click "New +" → "Web Service"
- Connect GitHub repository: `KumarAnandSingh/chess-academy-v3`
- Click "Connect"

### 3. Configure Service Settings
```
Name: chess-academy-backend
Runtime: Node
Root Directory: (leave blank)
Build Command: cd backend && npm install
Start Command: cd backend && npm start
Plan: Free
```

### 4. Environment Variables
```
NODE_ENV=production
```

### 5. Advanced Settings
```
Health Check Path: /health
Auto-Deploy: Yes (from main branch)
```

### 6. Deploy
- Click "Create Web Service"
- Wait 2-3 minutes for deployment
- Copy the generated URL (like: `https://chess-academy-backend-xxxx.onrender.com`)

### 7. Test the Deployment
Visit: `https://your-render-url.onrender.com/health`
Should return: `{"status":"OK","timestamp":"...","healthy":true}`

## EXPECTED RENDER URL FORMAT:
`https://chess-academy-backend-[random].onrender.com`

## NEXT STEP:
Once you have the Render URL, run:
```bash
# Replace RENDER_URL with your actual URL
echo "RENDER_URL=https://chess-academy-backend-xxxx.onrender.com"
```

Then I'll update the frontend configuration and redeploy to Vercel.