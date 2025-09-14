# Fairview Hospital App - Production Deployment Guide

## Overview
This guide covers deploying the Fairview Nursing Hospital React application to production with Supabase backend integration.

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account and project setup
- Netlify account (for deployment)

## Environment Setup

### 1. Environment Variables
Create a `.env` file in the project root with your Supabase credentials:

```bash
# Copy from .env.example
cp .env.example .env
```

Update the `.env` file with your actual Supabase credentials:
```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Build for Production
```bash
npm run build
```

## Deployment Options

### Option 1: Netlify (Recommended)

#### Automatic Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

#### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
npm run deploy
```

### Option 2: Manual Server Deployment

#### Build and Serve
```bash
# Build the application
npm run build

# Serve locally for testing
npm run preview

# Or use any static file server
npx serve -s dist -l 3000
```

## Database Setup (Supabase)

### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Create new project
- Note your project URL and anon key

### 2. Database Schema
Run the SQL commands from `SUPABASE_SETUP.md` to create tables:
- patients
- staff
- job_applications
- wards
- emergency_contacts

### 3. Sample Data
Insert sample data as provided in the setup guide.

## Production Configuration

### Security Headers
The `netlify.toml` file includes security headers:
- Content Security Policy
- XSS Protection
- Frame Options
- Content Type Options

### Performance Optimizations
- Code splitting with webpack
- Asset optimization
- Gzip compression
- Browser caching

## Monitoring and Maintenance

### Health Checks
- Monitor Supabase dashboard for database performance
- Check Netlify deployment logs
- Monitor application errors via browser console

### Updates
```bash
# Update dependencies
npm update

# Rebuild and redeploy
npm run build
npm run deploy
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+ required)
   - Verify all dependencies are installed
   - Check for syntax errors in code

2. **Database Connection Issues**
   - Verify Supabase URL and key
   - Check network connectivity
   - Ensure RLS policies are configured

3. **Deployment Issues**
   - Check build output in `dist/` folder
   - Verify environment variables
   - Check Netlify deployment logs

### Support
- Check application logs in browser developer tools
- Review Supabase logs in dashboard
- Contact system administrator for server issues

## Features Included

### Production-Ready Features
- ✅ Error boundaries for crash protection
- ✅ Loading states for better UX
- ✅ Form validation with error messages
- ✅ Retry logic for database operations
- ✅ Responsive design for mobile/desktop
- ✅ Security headers and CSP
- ✅ Code splitting and optimization

### Hospital Management Features
- ✅ Admin dashboard with authentication
- ✅ Patient management and portal
- ✅ Staff management system
- ✅ Job application system
- ✅ Ward management
- ✅ Emergency contact management
- ✅ Kenyan phone number validation
- ✅ Tendwet, Kenya location integration

## Configuration Files

- `netlify.toml` - Deployment configuration
- `webpack.config.js` - Build configuration
- `package.json` - Dependencies and scripts
- `.env.example` - Environment template
- `src/config/environment.js` - Application configuration

## Next Steps

1. Set up monitoring and alerting
2. Configure backup strategies for Supabase
3. Implement user authentication (beyond admin)
4. Add more comprehensive logging
5. Set up CI/CD pipeline for automated deployments

---

**Hospital Information:**
- Name: Fairview Nursing Hospital
- Location: Tendwet, Bomet County, Kenya
- Emergency: +254 700 123 456
- General: +254 700 123 457
