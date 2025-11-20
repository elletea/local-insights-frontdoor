# Deployment Guide: GitHub to Blockcell

This guide shows you how to deploy your **local-insights-frontdoor** Next.js application from GitHub to Blockcell hosting.

## 🚀 Current Deployment Status

Your site is currently deployed at:
**https://blockcell.sqprod.co/sites/local-insights-frontdoor/**

## 📋 Available Deployment Methods

### 1. **Manual Local Deployment** (Currently Working)
Deploy directly from your local machine:

```bash
# Build and deploy locally
npm run build
# Then use goose to deploy the ./out directory to Blockcell
```

### 2. **GitHub Actions Workflow** (Automated)
Automatically build and deploy on every push to main/master:

- ✅ **Workflow file created**: `.github/workflows/deploy-to-blockcell.yml`
- ⚠️ **Requires setup**: Blockcell API credentials needed
- 🔄 **Status**: Ready for configuration

### 3. **Manual GitHub Deployment Scripts**
Deploy from any GitHub branch manually:

```bash
# Deploy from current branch
./deploy-from-github.sh

# Deploy from specific branch  
./deploy-from-github.sh feature-branch

# Deploy using goose (recommended)
./goose-deploy-from-github.sh
```

## ⚙️ Configuration

### Next.js Configuration
Your app is configured for Blockcell deployment with:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',                                    // Static export
  trailingSlash: true,                                // Required for Blockcell
  basePath: '/sites/local-insights-frontdoor',        // Blockcell path
  assetPrefix: '/sites/local-insights-frontdoor',     // Asset loading
  images: { unoptimized: true }                       // Static compatibility
};
```

### GitHub Actions Setup (Optional)
To enable automatic deployment:

1. **Add Blockcell API Key** to GitHub Secrets:
   - Go to your repo → Settings → Secrets and variables → Actions
   - Add `BLOCKCELL_API_KEY` with your Blockcell API credentials

2. **Update workflow** to use actual Blockcell API:
   - Edit `.github/workflows/deploy-to-blockcell.yml`
   - Replace the placeholder deployment step with actual Blockcell API calls

## 🔧 Manual Deployment from GitHub

### Option A: Using the deployment script
```bash
# Clone and deploy in one command
./goose-deploy-from-github.sh

# Or deploy from specific branch
./goose-deploy-from-github.sh feature-branch
```

### Option B: Step by step
```bash
# 1. Clone the repository
git clone git@github.com:elletea/local-insights-frontdoor.git temp-deploy
cd temp-deploy

# 2. Install dependencies
npm ci

# 3. Build the static site
npm run build

# 4. Deploy to Blockcell (using goose)
goose session start
goose run "Deploy the static site in ./out to Blockcell with site name local-insights-frontdoor"

# 5. Cleanup
cd .. && rm -rf temp-deploy
```

## 📁 Project Structure

```
local-insights-frontdoor/
├── .github/workflows/
│   └── deploy-to-blockcell.yml     # GitHub Actions workflow
├── components/                      # React components
├── app/                            # Next.js app directory
├── public/                         # Static assets
├── out/                           # Build output (generated)
├── deploy-from-github.sh          # Manual deployment script
├── goose-deploy-from-github.sh    # Goose-powered deployment
├── next.config.ts                 # Blockcell-configured build
└── package.json                   # Dependencies
```

## 🌐 Live Site

Visit your deployed application:
**https://blockcell.sqprod.co/sites/local-insights-frontdoor/**

## 🔄 Version Management

Use Blockcell's version management:

```bash
# List all versions
goose run "List versions for local-insights-frontdoor site on Blockcell"

# Promote a specific version
goose run "Promote version [VERSION_ID] for local-insights-frontdoor site on Blockcell"
```

## 🛠️ Troubleshooting

### Build Issues
- Ensure all TypeScript errors are resolved
- Check that all dependencies are installed with `npm ci`
- Verify Next.js configuration is correct

### Deployment Issues  
- Check Blockcell service status
- Verify site name is available
- Ensure build output exists in `./out` directory

### GitHub Actions Issues
- Verify secrets are properly configured
- Check workflow permissions
- Review build logs for errors

---

## 🎯 Next Steps

1. **Test the deployment** by visiting the live site
2. **Set up GitHub Actions** for automatic deployment (optional)
3. **Create a pull request** to merge deployment configuration to main branch
4. **Document any custom deployment needs** for your team

Your site is now deployable from GitHub! 🚀
