# Frontend Deployment Guide for Render.com

## Prerequisites

1. **Render.com Account**: Sign up for a free Render account
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **Backend Deployed**: Your backend should already be running at `https://urlshortner-backend-51qz.onrender.com`

## Step 1: Deploy to Render

### Option A: Using Render Dashboard (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `url-shortener-frontend`
   - **Branch**: `master` (or your main branch)
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### Option B: Using render.yaml (Alternative)

1. The `render.yaml` file is already configured in the Frontend directory
2. Simply connect your repository to Render and it will auto-detect the configuration

## Step 2: Configure Environment Variables

In your Render static site dashboard, add these environment variables:

```
VITE_API_URL=https://urlshortner-backend-51qz.onrender.com
VITE_NODE_ENV=production
```

**Important Notes:**
- The `VITE_API_URL` is already set to your deployed backend URL
- Environment variables in Vite must be prefixed with `VITE_`
- These variables are embedded at build time, not runtime

## Step 3: Deploy

1. Click "Create Static Site"
2. Render will automatically build and deploy your application
3. The deployment process takes 2-5 minutes
4. Your frontend will be available at: `https://your-frontend-name.onrender.com`

## Step 4: Update Backend CORS

After deployment, you need to update your backend to allow your frontend domain:

1. Go to your backend service on Render
2. Add/update the environment variable:
   ```
   FRONTEND_URL=https://your-frontend-name.onrender.com
   ```
3. Redeploy your backend service

## Step 5: Test Deployment

1. Visit your frontend URL
2. Test user registration and login
3. Test URL shortening functionality
4. Test logout functionality
5. Verify all API calls work correctly

## Troubleshooting

### Common Issues:

1. **Build Fails**: 
   - Check that all dependencies are in package.json
   - Verify Node.js version compatibility

2. **API Calls Fail**:
   - Verify VITE_API_URL is set correctly
   - Check backend CORS configuration
   - Ensure backend is running and accessible

3. **Routing Issues**:
   - Render automatically handles SPA routing with the rewrite rules
   - If routes don't work, check the render.yaml configuration

4. **Environment Variables Not Working**:
   - Remember: Vite env vars must be prefixed with `VITE_`
   - Environment variables are embedded at build time
   - Redeploy after changing environment variables

### Checking Logs:

1. Go to your static site in Render dashboard
2. Click on "Deploys" tab to see build logs
3. Look for any error messages during the build process

## Free Tier Limitations

- Render free tier for static sites has:
  - 100GB bandwidth per month
  - Global CDN included
  - Automatic SSL certificates
  - No sleep time (unlike web services)

## Security Features

- Automatic HTTPS/SSL certificates
- Security headers configured in render.yaml
- Static file caching for better performance

## Performance Optimization

- Assets are cached for 1 year (31536000 seconds)
- Gzip compression enabled by default
- Global CDN for fast loading worldwide
