# 🚀 Complete Vercel Deployment Guide for Ryvex

This guide will walk you through deploying your Ryvex shop to Vercel **step-by-step, slowly, and clearly**. Don't worry—we'll go through every single step.

---

## 📋 Prerequisites (What You Need Before Starting)

Before we begin, make sure you have:

1. ✅ A GitHub account (free at github.com)
2. ✅ A Vercel account (free at vercel.com)
3. ✅ Your code pushed to GitHub (you said you already made a repo!)
4. ✅ A MySQL/TiDB database (we'll set this up)

**Do you have all of these?** If not, go create them now. They're all free!

---

## 🎯 Step 1: Push Your Code to GitHub

### What This Does
This uploads your entire Ryvex project to GitHub so Vercel can access it.

### How to Do It

**1a. Open your terminal/command prompt**

**1b. Navigate to your project folder:**
```bash
cd /path/to/your/fortnite-shop
```

**1c. Check if you already have a git repo:**
```bash
git status
```

If you see `fatal: not a git repository`, you need to initialize git:
```bash
git init
```

**1d. Add all your files:**
```bash
git add .
```

**1e. Create your first commit:**
```bash
git commit -m "Initial Ryvex deployment setup"
```

**1f. Add your GitHub repository as the remote:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Replace:
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with your repository name (e.g., "ryvex-shop")

**1g. Push to GitHub:**
```bash
git branch -M main
git push -u origin main
```

### ✅ Success Check
Go to `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME` and you should see all your files!

---

## 🗄️ Step 2: Set Up Your Database

### What This Does
Your Ryvex shop needs a database to store user data, affiliate info, discount codes, etc. We'll use a free MySQL database.

### How to Do It

**Option A: Use PlanetScale (Recommended - Free)**

1. Go to https://planetscale.com
2. Click "Sign Up" (free)
3. Create an account
4. Click "Create a database" 
5. Name it `ryvex` or similar
6. Click "Create database"
7. Click "Connect" 
8. Select "Node.js"
9. Copy the connection string that looks like:
   ```
   mysql://[username]:[password]@[host]/ryvex
   ```
10. **Save this somewhere safe!** You'll need it in Step 3.

**Option B: Use Railway (Also Free)**

1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "MySQL"
4. Railway will create a database for you
5. Click on the database
6. Go to "Connect"
7. Copy the MySQL connection string
8. **Save this somewhere safe!** You'll need it in Step 3.

---

## 🔑 Step 3: Connect Vercel to GitHub and Deploy

### What This Does
Vercel will automatically deploy your code from GitHub and set up all the environment variables.

### How to Do It

**3a. Go to Vercel:**
https://vercel.com

**3b. Click "New Project"**

**3c. Click "Import Git Repository"**

**3d. Find your repository:**
- If you see it in the list, click "Select"
- If you don't see it, click "Continue with GitHub" and authorize Vercel

**3e. Configure your project:**
- **Project Name:** `ryvex` (or whatever you want)
- **Framework Preset:** Select "Other" (since we have a custom setup)
- **Root Directory:** Leave as `.` (dot)

**3f. Click "Deploy"**

Vercel will now start building your project. **This takes 2-5 minutes.** Wait for it to finish.

---

## 🔐 Step 4: Add Environment Variables

### What This Does
Environment variables are secret settings your app needs to work. Think of them like passwords and configuration keys.

### How to Do It

**4a. After deployment, go to your Vercel project dashboard**

**4b. Click "Settings" in the top menu**

**4c. Click "Environment Variables" in the left sidebar**

**4d. Add each variable below. For each one:**
- Click "Add New"
- Paste the name (left side)
- Paste the value (right side)
- Select "Production" 
- Click "Save"

### Required Environment Variables

**1. DATABASE_URL** (Your MySQL connection string from Step 2)
```
mysql://[username]:[password]@[host]/ryvex
```

**2. JWT_SECRET** (Random secret for sessions)
```
your-super-secret-jwt-key-make-it-random-12345678
```
(Just make up a random string, at least 20 characters)

**3. VITE_APP_ID** (From Manus)
```
Ask your Manus provider for this
```

**4. OAUTH_SERVER_URL** (From Manus)
```
https://api.manus.im
```

**5. VITE_OAUTH_PORTAL_URL** (From Manus)
```
https://oauth.manus.im
```

**6. OWNER_OPEN_ID** (Your unique ID from Manus)
```
Ask your Manus provider for this
```

**7. OWNER_NAME** (Your name)
```
Your Name Here
```

**8. BUILT_IN_FORGE_API_URL** (From Manus)
```
https://api.manus.im
```

**9. BUILT_IN_FORGE_API_KEY** (From Manus)
```
Ask your Manus provider for this
```

**10. VITE_FRONTEND_FORGE_API_KEY** (From Manus)
```
Ask your Manus provider for this
```

**11. VITE_FRONTEND_FORGE_API_URL** (From Manus)
```
https://api.manus.im
```

### ⚠️ Important Notes
- **Never share these values!** They're like passwords.
- Keep them in a safe place (password manager)
- If you accidentally expose them, regenerate them immediately

---

## 🔄 Step 5: Redeploy After Adding Environment Variables

### What This Does
After adding environment variables, Vercel needs to rebuild your app with these new settings.

### How to Do It

**5a. Go back to your Vercel project dashboard**

**5b. Click "Deployments" in the top menu**

**5c. Find the most recent deployment**

**5d. Click the three dots (...) on the right**

**5e. Click "Redeploy"**

Vercel will rebuild your app with the new environment variables. Wait 2-5 minutes.

---

## ✅ Step 6: Test Your Deployment

### What This Does
We'll make sure everything is working correctly.

### How to Do It

**6a. Your Vercel project has a URL. It looks like:**
```
https://ryvex-[random-letters].vercel.app
```

**6b. Click on this URL to visit your live site**

**6c. Test these things:**

1. ✅ Homepage loads with "The Ultimate [morphing text]"
2. ✅ Product cards display correctly
3. ✅ Click "Join Affiliate Program" button
4. ✅ You're redirected to `/affiliate` page
5. ✅ Discord button works and goes to your Discord server
6. ✅ FAQ section expands and collapses

### If Something Doesn't Work

**Check the logs:**
1. Go to Vercel dashboard
2. Click "Deployments"
3. Click on the deployment
4. Click "Logs"
5. Look for red errors
6. Common issues:
   - Database connection failed → Check DATABASE_URL
   - OAuth not working → Check OAuth environment variables
   - Page not loading → Check the build logs

---

## 🎉 Step 7: Set Up a Custom Domain (Optional)

### What This Does
Instead of `ryvex-abc123.vercel.app`, you can have `ryvex.com`

### How to Do It

**7a. Go to your Vercel project Settings**

**7b. Click "Domains" in the left sidebar**

**7c. Enter your domain name:**
```
ryvex.com
```

**7d. Click "Add"**

**7e. Vercel will give you DNS records to add**

**7f. Go to your domain registrar (GoDaddy, Namecheap, etc.)**

**7g. Add the DNS records Vercel provided**

**7h. Wait 24-48 hours for DNS to propagate**

**7i. Your site will be live at `https://ryvex.com`!**

---

## 🚨 Troubleshooting Common Issues

### Issue: "Build Failed"
**Solution:** 
1. Check the build logs
2. Look for TypeScript errors
3. Make sure all dependencies are installed
4. Run locally: `pnpm install && pnpm build`

### Issue: "Database Connection Error"
**Solution:**
1. Check your DATABASE_URL is correct
2. Make sure your database is running
3. Test the connection string locally

### Issue: "OAuth Not Working"
**Solution:**
1. Double-check all OAuth environment variables
2. Make sure your Vercel URL is whitelisted in OAuth settings
3. Check the browser console for errors

### Issue: "Affiliate Dashboard Shows 'Please Log In'"
**Solution:**
1. Make sure OAuth is configured correctly
2. Try clearing browser cookies
3. Check that VITE_OAUTH_PORTAL_URL is correct

---

## 📊 Monitoring Your Deployment

### Check Your Site's Health

**1. Go to Vercel Dashboard**

**2. Click "Analytics" to see:**
- Page views
- Response times
- Errors

**3. Click "Deployments" to see:**
- Deployment history
- Build times
- Status (success/failed)

**4. Click "Settings" → "Logs" to see:**
- Real-time logs
- Errors and warnings
- Performance metrics

---

## 🔄 Updating Your Site After Deployment

### When You Make Changes

**1. Make changes locally**

**2. Commit and push to GitHub:**
```bash
git add .
git commit -m "Your change description"
git push origin main
```

**3. Vercel automatically detects the change and redeploys!**

**4. Your new version will be live in 2-5 minutes**

---

## 🎯 Quick Checklist

Before you launch, make sure:

- [ ] Code pushed to GitHub
- [ ] Database created and connection string saved
- [ ] Vercel project created
- [ ] All 11 environment variables added
- [ ] Deployment redeployed after adding env vars
- [ ] Homepage loads correctly
- [ ] Affiliate dashboard accessible
- [ ] Discord links work
- [ ] Database queries working (check affiliate dashboard)

---

## 💡 Pro Tips

1. **Always test locally first** before pushing to GitHub
2. **Keep environment variables secure** - never commit them to GitHub
3. **Monitor your deployments** - check logs if something breaks
4. **Set up automatic deploys** - Vercel does this by default
5. **Use preview deployments** - Vercel creates a preview for each pull request

---

## 🆘 Need Help?

If you get stuck:

1. **Check Vercel logs** - They usually tell you what's wrong
2. **Read error messages carefully** - They're usually helpful
3. **Test locally first** - `pnpm dev` to make sure it works
4. **Check environment variables** - Most issues are here
5. **Ask in Vercel Discord** - Community is very helpful

---

## 🎉 Congratulations!

Once you complete all these steps, your Ryvex shop will be **live on the internet** for the world to see! 

Your affiliate program will be running, customers can use discount codes, and you'll start earning passive income.

**Good luck! 🚀**
