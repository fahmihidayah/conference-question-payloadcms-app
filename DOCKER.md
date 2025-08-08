# Docker Setup for KonfQ Application

This document explains how to build and run the KonfQ application using Docker.

## 🐳 Quick Start

### Using Docker Compose (Recommended)

1. **Clone and prepare the project**:
   ```bash
   git clone <repository-url>
   cd question-payloadcms
   ```

2. **Start the services**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - Database: localhost:5432

### Using Docker Only

1. **Build the image**:
   ```bash
   docker build -t konfq-app .
   ```

2. **Run with external database**:
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URI="postgresql://user:pass@host:5432/db" \
     -e PAYLOAD_SECRET="your-secret-here" \
     -e NEXT_PUBLIC_SERVER_URL="http://localhost:3000" \
     konfq-app
   ```

## 🛠 Configuration

### Environment Variables

Create a `.env` file or set these environment variables:

```env
# Database (Required)
DATABASE_URI=postgresql://postgres:password@db:5432/question_app

# Security (Required)
PAYLOAD_SECRET=your-32-character-secret-key-here

# Application (Required)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Optional
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
```

### Docker Compose Services

#### Application Service (`app`)
- **Image**: Built from local Dockerfile
- **Port**: 3000
- **Dependencies**: PostgreSQL database
- **Health Check**: `/api/health` endpoint

#### Database Service (`db`)
- **Image**: postgres:16-alpine
- **Port**: 5432
- **Volume**: Persistent data storage
- **Health Check**: PostgreSQL ready check

## 📁 Multi-Stage Build

Our Dockerfile uses a 4-stage build process:

### Stage 1: Base (`base`)
- Node.js 22.12.0 Alpine
- Essential dependencies (libc6-compat, dumb-init, wget)
- pnpm package manager

### Stage 2: Dependencies (`deps`)
- Install all Node.js dependencies
- Uses pnpm with caching for faster builds

### Stage 3: Builder (`builder`)
- Generate Payload types and importmap
- Build the Next.js application
- Create optimized production bundle

### Stage 4: Runner (`runner`)
- Minimal runtime environment
- Non-root user for security
- Health checks enabled
- Optimized for production

## 🚀 Build Commands

### Development Build
```bash
docker-compose -f docker-compose.yml up --build
```

### Production Build
```bash
docker build --target runner -t konfq-app:latest .
```

### Build with cache optimization
```bash
docker build --target runner \
  --cache-from konfq-app:cache \
  -t konfq-app:latest .
```

## 🔍 Troubleshooting

### Common Issues

1. **Build fails with "pnpm not found"**
   ```bash
   # Solution: Enable corepack
   RUN corepack enable
   ```

2. **Database connection fails**
   - Check `DATABASE_URI` format
   - Ensure database is healthy before app starts
   - Verify network connectivity between services

3. **Permission denied errors**
   ```bash
   # Solution: Check file ownership
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   ```

4. **Health check fails**
   - Verify `/api/health` endpoint is accessible
   - Check if wget is installed in the image
   - Adjust health check timing for slower builds

### Debug Commands

```bash
# Check container logs
docker-compose logs app

# Access container shell
docker-compose exec app sh

# Check database connection
docker-compose exec db psql -U postgres -d question_app

# View container resource usage
docker stats

# Inspect image layers
docker history konfq-app:latest
```

## 📊 Performance Optimization

### Build Optimization
- Uses multi-stage builds to reduce final image size
- Layer caching for dependencies
- Excludes unnecessary files via `.dockerignore`

### Runtime Optimization
- Non-root user for security
- dumb-init for proper signal handling
- Health checks for container orchestration
- Minimal Alpine Linux base

### Database Optimization
- Persistent volume for data
- Connection pooling ready
- Health checks for reliability

## 🔒 Security Features

- **Non-root user**: Application runs as `nextjs` user
- **Minimal attack surface**: Alpine Linux base image
- **Secure defaults**: Environment variable validation
- **Health monitoring**: Application health endpoints

## 📈 Monitoring

### Health Checks
- **Application**: `GET /api/health`
- **Database**: `pg_isready` check
- **Container**: Docker health check integration

### Logs
- Application logs via stdout/stderr
- Database logs available via Docker
- Structured logging for production monitoring

## 🚢 Production Deployment

### Docker Swarm
```bash
docker stack deploy -c docker-compose.yml konfq-stack
```

### Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: konfq-app
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: app
        image: konfq-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URI
          valueFrom:
            secretKeyRef:
              name: konfq-secrets
              key: database-uri
```

### Environment-Specific Configs

Create separate docker-compose files:
- `docker-compose.yml` (development)
- `docker-compose.prod.yml` (production)
- `docker-compose.test.yml` (testing)

## 📋 Maintenance

### Update Dependencies
```bash
# Rebuild with latest dependencies
docker-compose build --no-cache app

# Update base images
docker pull node:22.12.0-alpine
docker pull postgres:16-alpine
```

### Backup Database
```bash
# Backup
docker-compose exec db pg_dump -U postgres question_app > backup.sql

# Restore
docker-compose exec -T db psql -U postgres question_app < backup.sql
```

### Clean Up
```bash
# Remove unused images and containers
docker system prune

# Remove all project containers and volumes
docker-compose down -v --rmi all
```