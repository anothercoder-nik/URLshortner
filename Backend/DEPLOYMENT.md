# Backend Deployment Guide for Render.com

## Prerequisites

1. **MongoDB Atlas Account**: Create a free MongoDB Atlas cluster
2. **Render.com Account**: Sign up for a free Render account
3. **GitHub Repository**: Your code should be pushed to GitHub

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier is sufficient)
3. Create a database user with read/write permissions
4. Whitelist all IP addresses (0.0.0.0/0) for Render deployment
5. Get your connection string (it should look like: `mongodb+srv://username:password@cluster.mongodb.net/UrlShortner`)

## Step 2: Deploy to Render

### Option A: Using Render Dashboard (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `url-shortener-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `master` (or your main branch)
   - **Root Directory**: `Backend/src`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Option B: Using render.yaml (Alternative)

1. The `render.yaml` file is already configured in the Backend directory
2. Simply connect your repository to Render and it will auto-detect the configuration

## Step 3: Configure Environment Variables

In your Render service dashboard, add these environment variables:

```
NODE_ENV=production
PORT=10000
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/UrlShortner
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
BASE_URL=https://your-service-name.onrender.com/
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Important Notes:**
- Replace `your-service-name` with your actual Render service name
- Replace the MongoDB connection string with your actual Atlas connection string
- Generate a strong, random JWT secret (at least 32 characters)
- Update FRONTEND_URL with your actual frontend deployment URL

## Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. The deployment process takes 2-5 minutes
4. Your API will be available at: `https://your-service-name.onrender.com`

## Step 5: Test Deployment

1. Visit `https://your-service-name.onrender.com/health` - should return status OK
2. Test API endpoints using Postman or curl
3. Update your frontend to use the new backend URL

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check that all dependencies are in package.json
2. **Database Connection Error**: Verify MongoDB Atlas connection string and IP whitelist
3. **CORS Errors**: Ensure FRONTEND_URL environment variable is set correctly
4. **Service Won't Start**: Check logs in Render dashboard for specific errors

### Checking Logs:

1. Go to your service in Render dashboard
2. Click on "Logs" tab to see real-time logs
3. Look for any error messages during startup

## Free Tier Limitations

- Render free tier services sleep after 15 minutes of inactivity
- First request after sleep may take 30+ seconds (cold start)
- Consider upgrading to paid tier for production use

## Security Notes

- Never commit .env files to GitHub
- Use strong, unique JWT secrets
- Regularly rotate your database passwords
- Monitor your application logs for suspicious activity
