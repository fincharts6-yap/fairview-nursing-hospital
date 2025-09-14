# Fairview Nursing Hospital - Complete Management System

A comprehensive React application for hospital management featuring admin dashboard, patient portal, job applications, and full CRUD operations.

## 🏥 Features

### Core System
- **Modern React 18** with functional components and hooks
- **Responsive Design** that works on desktop, tablet, and mobile
- **Professional Healthcare UI** with medical-themed styling
- **Complete Hospital Management** with real-time data updates

### Admin Dashboard (Password: 'nesh md')
- **Staff Management**: View profiles, edit departments, add/remove staff
- **Patient Management**: Medical charts, medications, emergency contacts, discharge clearance
- **Job Applications**: Review, approve/reject applicants, schedule interviews
- **Ward Management**: Add/edit wards, manage bed capacity, view reports
- **Real-time Statistics**: Active nurses, bed occupancy, appointments, emergencies

### Patient Portal
- **Secure Login**: Patient ID verification system
- **Medical Dashboard**: Current admission details, medications, allergies
- **Emergency Contacts**: Add/manage emergency contact information
- **Discharge Status**: Real-time clearance tracking

### Job Application System

### Production-Ready Features
- **Error Boundaries**: Comprehensive error handling and recovery
- **Loading States**: User-friendly loading indicators
- **Form Validation**: Kenya-specific phone number and ID validation
- **Retry Logic**: Automatic retry for failed database operations
- **Responsive Design**: Mobile and desktop optimized
- **Bottom Navigation**: Easy mobile navigation

## 🚀 Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **Backend**: Supabase (PostgreSQL database)
- **Build Tool**: Webpack 5 with production optimizations
- **Styling**: Modern CSS3 with responsive design
- **Deployment**: Netlify-ready with security headers

## 📱 Navigation

The app features a modern bottom navigation bar with:
- 🏠 **Home** - Hospital information and overview
- 🩺 **Services** - Medical services and specialties
- 📞 **Contact** - Contact information and location

*Admin access is hidden - double-click the hospital icon (🏥) in the header to access administrative features.*

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for database)

### 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fairview-hospital
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Access the application**
   - Open http://localhost:3001
   - For admin access: Double-click the hospital icon (🏥) in the header

## 📊 Patient Data Flow

### Registration to Admin Panel
1. **Patient Registration**: Patients fill out comprehensive registration form
2. **Database Storage**: All data saved to Supabase `patients` table
3. **Admin Visibility**: Registered patients immediately appear in admin panel
4. **Complete Details**: Admin can view all submitted information including:
   - Personal details (name, age, gender, contact)
   - Medical history and allergies
   - Current medications
   - Next of kin information
   - Emergency contacts

### Admin Patient Management
- View all registered patients in organized cards
- Access full patient charts with complete medical information
- Manage discharge clearance status
- Track patient admission dates and conditions

## 📋 Available Scripts

- `npm start` - Development server (port 3001)
- `npm run build` - Production build
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to Netlify
- `npm run build:analyze` - Analyze bundle size

## 🏗️ Project Structure

**Current Implementation**: Uses React state (in-memory storage)
- Data resets on page refresh
- No persistent storage
- Perfect for demos and prototyping

**Production Requirements**:

#### Option 1: Supabase (Recommended) 🌟
```bash
npm install @supabase/supabase-js
```
- **Pros**: Easy setup, real-time features, built-in auth, free tier
- **Setup Time**: 1-2 hours
- **Cost**: Free up to 50MB, then $25/month

#### Option 2: Firebase 🔥
```bash
npm install firebase
```
- **Pros**: Google integration, real-time database, good documentation
- **Setup Time**: 2-3 hours
- **Cost**: Free tier available, pay-as-you-go

#### Option 3: Custom Backend 🛠️
- Node.js + Express + PostgreSQL/MongoDB
- **Pros**: Full control, custom business logic
- **Setup Time**: 1-2 weeks
- **Cost**: Server hosting required

### Database Schema Needed:
```sql
-- Users (Admin/Staff)
-- Patients (with medical records)
-- Staff (nursing staff)
-- JobApplications (applicant data)
-- Wards (hospital wards)
-- EmergencyContacts (patient contacts)
-- Medications (patient medications)
```

## Project Structure

```
fairview-hospital/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js             # Main application component
│   ├── App.css            # Application styles
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── webpack.config.js      # Webpack configuration
├── .babelrc              # Babel configuration
└── README.md             # This file
```

## Sections

### Home
Welcome section with hero banner and call-to-action buttons

### Services
- Emergency Care (24/7)
- Surgery
- Cardiology  
- Pediatrics

### Contact
Complete contact information including address, phone numbers, and hours

## Technologies Used

- React 18
- Webpack 5
- Babel
- CSS3 with modern features
- ES6+ JavaScript

## Development

The app uses modern React patterns including:
- Functional components with hooks
- State management with useState
- Conditional rendering
- Event handling
- Responsive CSS Grid and Flexbox

## Customization

To customize the hospital information:
1. Edit the content in `src/App.js`
2. Modify styles in `src/App.css`
3. Update the title and meta information in `public/index.html`

## Production Build

To create a production build:

```bash
npm run build
```

This creates a `build` folder with optimized files ready for deployment.
