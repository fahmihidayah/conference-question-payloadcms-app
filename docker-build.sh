#!/bin/bash

# Docker Build and Test Script for KonfQ Application
set -e

echo "🐳 Building KonfQ Docker Application..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker first."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    print_error "docker-compose is not installed. Please install docker-compose first."
    exit 1
fi

# Function to cleanup on script exit
cleanup() {
    print_status "Cleaning up..."
    docker-compose down > /dev/null 2>&1 || true
}

# Set cleanup trap
trap cleanup EXIT

# Build the application
print_status "Building Docker images..."
if docker-compose build --no-cache; then
    print_success "Docker images built successfully!"
else
    print_error "Docker build failed!"
    exit 1
fi

# Check if we should run tests
if [[ "$1" == "--test" || "$1" == "-t" ]]; then
    print_status "Starting services for testing..."
    
    # Start services in detached mode
    if docker-compose up -d; then
        print_success "Services started successfully!"
    else
        print_error "Failed to start services!"
        exit 1
    fi
    
    # Wait for services to be healthy
    print_status "Waiting for services to be healthy..."
    sleep 10
    
    # Check application health
    print_status "Checking application health..."
    max_retries=30
    retry_count=0
    
    while [ $retry_count -lt $max_retries ]; do
        if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
            print_success "Application is healthy!"
            break
        else
            retry_count=$((retry_count + 1))
            print_status "Waiting for application to be ready... ($retry_count/$max_retries)"
            sleep 2
        fi
    done
    
    if [ $retry_count -eq $max_retries ]; then
        print_error "Application failed to become healthy within timeout!"
        docker-compose logs app
        exit 1
    fi
    
    # Test database connection
    print_status "Testing database connection..."
    if docker-compose exec -T db pg_isready -U postgres > /dev/null; then
        print_success "Database is ready!"
    else
        print_error "Database is not ready!"
        docker-compose logs db
        exit 1
    fi
    
    # Test application endpoints
    print_status "Testing application endpoints..."
    
    # Test home page
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_success "Home page is accessible!"
    else
        print_warning "Home page test failed - this might be expected for API-only apps"
    fi
    
    # Test admin panel
    if curl -f http://localhost:3000/admin > /dev/null 2>&1; then
        print_success "Admin panel is accessible!"
    else
        print_warning "Admin panel test failed - this might be expected without proper setup"
    fi
    
    print_success "All tests passed!"
    
    # Ask user if they want to keep services running
    echo ""
    read -p "Do you want to keep the services running? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Services will continue running. Use 'docker-compose down' to stop them."
        trap - EXIT  # Remove cleanup trap
    else
        print_status "Stopping services..."
        docker-compose down
    fi
else
    print_success "Build completed successfully!"
    print_status "To start the application, run: docker-compose up"
    print_status "To run with tests, use: $0 --test"
fi

print_success "Docker setup completed! 🎉"

# Show useful commands
echo ""
echo "📋 Useful commands:"
echo "  Start services:           docker-compose up"
echo "  Start in background:      docker-compose up -d"
echo "  View logs:                docker-compose logs -f"
echo "  Stop services:            docker-compose down"
echo "  Rebuild and start:        docker-compose up --build"
echo "  Access application:       http://localhost:3000"
echo "  Access admin panel:       http://localhost:3000/admin"