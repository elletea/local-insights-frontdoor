#!/bin/bash

# Workspace Setup Script
# This script installs necessary packages for the Next.js project

set -e  # Exit on error

echo "🚀 Starting workspace setup..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in current directory"
    exit 1
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Verify installation
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Workspace setup complete!"
    echo ""
    echo "Available commands:"
    echo "  npm run dev   - Start development server"
    echo "  npm run build - Build for production"
    echo "  npm run start - Start production server"
    echo "  npm run lint  - Run linter"
else
    echo "❌ Installation failed. Please check the errors above."
    exit 1
fi
