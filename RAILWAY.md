# Railway Deployment Guide for KonfQ

This guide explains how to deploy the KonfQ application to Railway.

## 🚂 Quick Deploy to Railway

### Option 1: One-Click Deploy (Recommended)

1. **Fork this repository** to your GitHub account

2. **Connect to Railway**:
   - Go to [Railway.app](https://railway.app)
   - Sign up/Login with GitHub
   - Create a new project
   - Connect your forked repository

3. **Railway will automatically detect and build** using the Dockerfile

### Option 2: Railway CLI

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Deploy from your project directory**:
   ```bash
   railway init
   railway up
   ```

## ⚙️ Environment Configuration

Set these environment variables in Railway dashboard:

### Required Variables

```env
# Database (use Railway PostgreSQL add-on)
DATABASE_URI=${{Postgres.DATABASE_URL}}

# Security - Generate secure random strings
PAYLOAD_SECRET=your-32-character-secret-here
CRON_SECRET=your-cron-secret-here
PREVIEW_SECRET=your-preview-secret-here

# Application URL (Railway provides this)
NEXT_PUBLIC_SERVER_URL=${{RAILWAY_STATIC_URL}}

# Node.js Configuration
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### How to Set Variables in Railway

1. Go to your Railway project dashboard
2. Click on your service
3. Go to "Variables" tab
4. Add each environment variable

## 🗄️ Database Setup

### Add PostgreSQL Database

1. In Railway dashboard, click **"New Service"**
2. Select **"Database" → "PostgreSQL"**
3. Railway will automatically create `DATABASE_URL`
4. Use this format in your app: `DATABASE_URI=${{Postgres.DATABASE_URL}}`

### Database Migration

Railway will automatically run migrations during deployment if configured in your PayloadCMS setup.

## 🐳 Docker Configuration

Railway automatically uses the main `Dockerfile`. Key Railway-specific optimizations:

### Railway-Optimized Features

- ✅ **No cache mounts** (Railway doesn't support them)
- ✅ **Multi-stage build** for optimized image size
- ✅ **Proper pnpm handling** with Railway-compatible commands
- ✅ **Flexible port binding** (Railway assigns ports automatically)
- ✅ **Error handling** for optional build steps

### Alternative: Use Railway-Specific Dockerfile

If you want to use the Railway-optimized Dockerfile:

1. In Railway dashboard, go to **Settings → Build**
2. Set **Dockerfile Path** to: `Dockerfile.railway`

## 🔧 Build Configuration

### Automatic Detection

Railway automatically detects:
- **Node.js** project
- **pnpm** package manager (via pnpm-lock.yaml)
- **Dockerfile** for containerized build

### Custom Build Settings

If needed, you can customize in Railway dashboard:

```json
{
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  }
}
```

## 🚀 Deployment Process

### What Happens During Deploy

1. **Source Code**: Railway pulls from your GitHub repo
2. **Docker Build**: Runs multi-stage build process
3. **Environment**: Injects environment variables
4. **Port Binding**: Automatically assigns and binds ports
5. **Health Check**: Monitors application health
6. **SSL/HTTPS**: Automatically provides SSL certificate

### Deploy Commands

```bash
# Manual deployment
railway up

# Deploy specific service
railway up --service <service-name>

# View logs
railway logs

# Open application
railway open
```

## 📊 Monitoring & Debugging

### View Logs

```bash
# Via CLI
railway logs

# Via Dashboard
Go to your service → Deployments → Click on deployment → View logs
```

### Common Issues & Solutions

#### Build Fails with Cache Mount Error
- **Issue**: `Cache mounts MUST be in the format --mount=type=cache,id=<cache-id>`
- **Solution**: Use the updated Dockerfile without cache mounts (already fixed)

#### pnpm Installation Fails
- **Issue**: Corepack signature verification errors
- **Solution**: Use `corepack prepare pnpm@latest --activate` (already implemented)

#### Database Connection Error
- **Issue**: Cannot connect to database
- **Solution**: 
  1. Ensure PostgreSQL add-on is added
  2. Use `DATABASE_URI=${{Postgres.DATABASE_URL}}`
  3. Check that both services are in the same project

#### Build Timeout
- **Issue**: Build takes too long and times out
- **Solution**: 
  1. Use Railway-specific Dockerfile for faster builds
  2. Remove unnecessary dependencies
  3. Contact Railway support to increase timeout

### Debug Commands

```bash
# Check service status
railway status

# View environment variables
railway variables

# SSH into deployment (if needed)
railway shell
```

## 🔒 Production Best Practices

### Security
- Use Railway's secret management for sensitive variables
- Enable Railway's built-in DDoS protection
- Use strong, randomly generated secrets

### Performance
- Enable Railway's CDN for static assets
- Use Railway's auto-scaling features
- Monitor resource usage in dashboard

### Maintenance
- Set up GitHub Actions for automated testing
- Use Railway's preview deployments for testing
- Monitor logs and metrics regularly

## 🌐 Custom Domain

1. **Buy a domain** from your preferred registrar
2. **In Railway dashboard**:
   - Go to your service → Settings → Domains
   - Click "Custom Domain"
   - Enter your domain
   - Follow DNS configuration instructions

## 💰 Pricing Considerations

### Railway Pricing
- **Free Tier**: $0/month with usage limits
- **Pro Plan**: $20/month with higher limits
- **Usage-based billing** for resources

### Optimize Costs
- Use efficient Docker builds
- Monitor resource usage
- Scale down during low traffic periods

## 📋 Deployment Checklist

- [ ] Fork repository to your GitHub
- [ ] Create Railway account
- [ ] Connect GitHub repository
- [ ] Add PostgreSQL database service
- [ ] Configure environment variables
- [ ] Deploy and test application
- [ ] Set up custom domain (optional)
- [ ] Configure monitoring and alerts

## 🆘 Support

If you encounter issues:

1. **Railway Documentation**: [docs.railway.app](https://docs.railway.app)
2. **Railway Discord**: Join their community Discord
3. **GitHub Issues**: Report issues in this repository
4. **Railway Status**: [status.railway.app](https://status.railway.app)

## 📈 Next Steps After Deployment

1. **Test all features** thoroughly
2. **Set up monitoring** and error tracking
3. **Configure backups** for database
4. **Set up CI/CD** with GitHub Actions
5. **Monitor performance** and optimize as needed

Your KonfQ application is now ready for Railway deployment! 🎉