#!/bin/bash
set -e  # Exit on error

echo "🚀 Setting up Next.js workspace..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Check if we're in a Next.js project
if [ ! -f "$CONDUCTOR_ROOT_PATH/package.json" ]; then
    echo "❌ Error: package.json not found in root directory."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

# Copy .env file if it exists in the root
if [ -f "$CONDUCTOR_ROOT_PATH/.env" ]; then
    echo "🔐 Linking environment variables..."
    ln -sf "$CONDUCTOR_ROOT_PATH/.env" .env
    echo "✅ Environment file linked"
else
    echo "⚠️  No .env file found in root. If you need environment variables, create one at $CONDUCTOR_ROOT_PATH/.env"
fi

# Copy .env.local if it exists in the root
if [ -f "$CONDUCTOR_ROOT_PATH/.env.local" ]; then
    echo "🔐 Linking local environment variables..."
    ln -sf "$CONDUCTOR_ROOT_PATH/.env.local" .env.local
    echo "✅ Local environment file linked"
fi

echo "✨ Workspace setup complete! Run 'npm run dev' to start the development server."
