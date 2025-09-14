# 🚀 GitHub Setup Guide - Step by Step

## 📋 What You'll Do
1. Create a GitHub account (if you don't have one)
2. Create a new repository
3. Push your hospital app to GitHub
4. Share the repository link

---

## Step 1: Create GitHub Account (Skip if you have one)

1. Go to [github.com](https://github.com)
2. Click "Sign up" 
3. Enter your email, create a password, choose a username
4. Verify your email

---

## Step 2: Create New Repository

1. **Login to GitHub**
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Fill in the details:**
   - Repository name: `fairview-hospital`
   - Description: `Hospital Management System - React App with Supabase`
   - Make it **Public** (so others can see it)
   - **DO NOT** check "Add a README file" (we already have one)
   - **DO NOT** add .gitignore (we already have one)
5. **Click "Create repository"**

---

## Step 3: Copy the Commands

After creating the repository, GitHub will show you commands. **Copy these exactly:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/fairview-hospital.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

---

## Step 4: Run Commands in Order

Open your terminal in the project folder and run these commands **one by one**:

### Initialize Git Repository
```bash
cd C:\Users\bambi\fairview-hospital
git init
```

### Add All Files
```bash
git add .
```

### Create First Commit
```bash
git commit -m "Initial commit: Complete Hospital Management System

Features:
- Patient registration and portal
- Admin panel with staff management
- Job application system
- Ward management
- Supabase database integration
- Mobile responsive design
- Kenya-specific validation"
```

### Connect to GitHub (Use your copied commands)
```bash
git remote add origin https://github.com/YOUR_USERNAME/fairview-hospital.git
git branch -M main
git push -u origin main
```

---

## Step 5: Verify Upload

1. **Refresh your GitHub repository page**
2. **You should see all your files:**
   - src/ folder with React components
   - public/ folder
   - package.json
   - README.md
   - All other project files

---

## 🎉 Success!

Your hospital management system is now on GitHub! 

**Share your repository:**
- URL will be: `https://github.com/YOUR_USERNAME/fairview-hospital`
- Anyone can view your code and documentation

---

## 🔧 If Something Goes Wrong

**Common Issues:**

1. **"git not recognized"** → Make sure Git is installed and restart terminal
2. **"Permission denied"** → Make sure you're logged into GitHub
3. **"Repository not found"** → Check the repository name matches exactly

**Need Help?**
- Double-check each command
- Make sure you're in the right folder: `C:\Users\bambi\fairview-hospital`
- Repository name must match exactly: `fairview-hospital`
