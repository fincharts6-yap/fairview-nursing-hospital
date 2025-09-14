# Fairview Hospital Setup Instructions

## Prerequisites Installation

To run the Fairview Hospital Management System, you need to install the following software:

### 1. Install Node.js and npm

**Download and Install:**
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the **LTS version** (recommended for most users)
3. Run the installer and follow the installation wizard
4. Restart your terminal/command prompt after installation

**Verify Installation:**
```bash
node --version
npm --version
```

### 2. Install Git (for version control)

**Download and Install:**
1. Visit [git-scm.com](https://git-scm.com/download/win)
2. Download Git for Windows
3. Run the installer with default settings
4. Restart your terminal after installation

**Verify Installation:**
```bash
git --version
```

## Running the Application

Once Node.js is installed, follow these steps:

### 1. Install Dependencies
```bash
cd C:\Users\bambi\fairview-hospital
npm install
```

### 2. Set Up Environment Variables
```bash
# Copy the example environment file
copy .env.example .env

# Edit .env file with your Supabase credentials
# REACT_APP_SUPABASE_URL=your_supabase_url
# REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Start the Development Server
```bash
npm start
```

The application will open at: **http://localhost:3001**

## Application Features

### 🏥 Main Features
- **Patient Registration**: Complete patient registration form
- **Patient Portal**: Existing patient login and dashboard
- **Admin Panel**: Comprehensive hospital management (double-click 🏥 icon)
- **Staff Management**: Full CRUD operations for hospital staff
- **Job Applications**: Apply for nursing positions
- **Ward Management**: Track bed occupancy and ward status

### 👨‍💼 Admin Access
- **Access**: Double-click the hospital icon (🏥) in the header
- **Credentials**: Username: `admin`, Password: `nesh md`
- **Features**: Patient management, staff management, job applications, ward management

### 🏥 Demo Patient IDs
- **P001**: Test patient with full medical records
- **P002**: Another test patient for portal testing

## Database Setup (Supabase)

The application uses Supabase as the backend database. See `SUPABASE_SETUP.md` for detailed setup instructions.

## Deployment

The application is ready for deployment with:
- **Netlify**: Use `npm run deploy` (requires Netlify CLI)
- **Manual**: Use `npm run build` to create production build

## Support

For issues or questions:
- Check the `README.md` for detailed documentation
- Review `DEPLOYMENT_GUIDE.md` for deployment instructions
- Ensure all prerequisites are properly installed

## Hospital Information

**Fairview Nursing Hospital**
- Location: Tendwet, Bomet County, Kenya
- Phone: +254 722659180
- Emergency: +254 700 123 456
