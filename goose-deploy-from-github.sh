#!/bin/bash

# Deploy from GitHub using goose
# This script clones, builds, and deploys using goose's Blockcell extension

set -e

BRANCH=${1:-main}
SITE_NAME="local-insights-frontdoor"
TEMP_DIR=$(mktemp -d)
REPO_URL="git@github.com:elletea/local-insights-frontdoor.git"

echo "🚀 Deploying $SITE_NAME from GitHub using goose"
echo "📍 Repository: $REPO_URL"
echo "🌿 Branch: $BRANCH"
echo "📁 Temp directory: $TEMP_DIR"

# Clone the repository
echo "📥 Cloning repository..."
git clone --branch $BRANCH --single-branch $REPO_URL $TEMP_DIR

cd $TEMP_DIR

# Install dependencies and build
echo "📦 Installing dependencies..."
npm ci

echo "🔨 Building Next.js app..."
npm run build

# Check if goose is available and deploy
if command -v goose &> /dev/null; then
    echo "📤 Deploying to Blockcell using goose..."
    goose session start --profile default
    goose run "Deploy the static site in $TEMP_DIR/out to Blockcell with site name $SITE_NAME"
else
    echo "⚠️  goose CLI not found. Build completed in $TEMP_DIR/out"
    echo "You can manually deploy these files to Blockcell"
    ls -la out/
fi

# Cleanup
echo "🧹 Cleaning up..."
# Uncomment the next line if you want to auto-cleanup
# rm -rf $TEMP_DIR

echo "✨ Deployment completed!"
echo "🌐 Site URL: https://blockcell.sqprod.co/sites/$SITE_NAME/"
echo "📁 Build files (if kept): $TEMP_DIR/out"
