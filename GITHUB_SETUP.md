# 🚀 How to Push to GitHub

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name**: `smarter-resume-builder` (or any name you like)
   - **Description**: "AI-powered resume builder with ATS optimization"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

## Step 2: Initialize Git (if not already done)

Open your terminal in the project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: Smarter Resume Builder with AI suggestions"
```

## Step 3: Connect to GitHub

After creating the repository on GitHub, you'll see instructions. Use these commands:

```bash
# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/smarter-resume-builder.git

# Rename default branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Complete Command Sequence

Here's everything in one go (replace `YOUR_USERNAME` and `REPO_NAME`):

```bash
# 1. Initialize git
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: Smarter Resume Builder with AI suggestions"

# 4. Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 5. Set branch to main
git branch -M main

# 6. Push to GitHub
git push -u origin main
```

## ⚠️ Important: Before Pushing

### Make sure .env is NOT committed!

Your `.gitignore` should already include `.env`. Verify it's there:

```bash
# Check if .env is in .gitignore
cat .gitignore
```

You should see `.env` listed. This prevents your API keys from being pushed to GitHub.

### Create .env.example (already done)

The `.env.example` file is already created and will be pushed (it's safe - no real keys).

## Authentication

If you're asked for credentials:

### Option 1: Personal Access Token (Recommended)
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Select scopes: `repo` (full control)
4. Copy the token
5. Use it as password when pushing

### Option 2: GitHub CLI
```bash
# Install GitHub CLI (if not installed)
# Then authenticate
gh auth login
```

## Verify Your Push

After pushing, check GitHub:
1. Go to your repository on GitHub
2. You should see all your files
3. Make sure `.env` is **NOT** visible (it should be ignored)

## Future Updates

To push future changes:

```bash
# Add changed files
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push
```

## Troubleshooting

### Error: "remote origin already exists"
```bash
# Remove existing remote
git remote remove origin

# Add again with correct URL
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### Error: "failed to push some refs"
```bash
# Pull first, then push
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Error: Authentication failed
- Use Personal Access Token instead of password
- Or set up SSH keys

## What Gets Pushed

✅ **Will be pushed:**
- All source code
- package.json
- README.md
- .gitignore
- .env.example (safe - no real keys)

❌ **Will NOT be pushed (protected by .gitignore):**
- .env (your actual API keys)
- node_modules/
- *.log files
- .DS_Store

---

**Ready to push?** Follow the steps above! 🚀

