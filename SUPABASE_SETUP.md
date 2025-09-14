# Supabase Setup Guide for Fairview Hospital

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login with GitHub or email
3. Click "New Project"
4. Choose organization and enter:
   - **Name**: `fairview-hospital`
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to your location
5. Click "Create new project" (takes 2-3 minutes)

## Step 2: Get Your Credentials

After project creation:
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Update Configuration

Replace in `src/supabaseClient.js`:
```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL' // Replace with your Project URL
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY' // Replace with your anon key
```

## Step 4: Create Database Tables

Go to **SQL Editor** in Supabase dashboard and run this SQL:

```sql
-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Patients table
CREATE TABLE patients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    room TEXT,
    ward TEXT,
    doctor TEXT,
    condition TEXT,
    admission_date DATE,
    clearance_status TEXT DEFAULT 'pending',
    medications JSONB DEFAULT '[]',
    allergies JSONB DEFAULT '[]',
    emergency_contacts JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff table
CREATE TABLE staff (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT,
    department TEXT,
    shift TEXT,
    status TEXT DEFAULT 'active',
    hire_date DATE,
    certifications JSONB DEFAULT '[]',
    phone TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job Applications table
CREATE TABLE job_applications (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    position TEXT,
    department TEXT,
    experience TEXT,
    education TEXT,
    status TEXT DEFAULT 'pending',
    applied_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wards table
CREATE TABLE wards (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    capacity INTEGER,
    occupied INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    head_nurse TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emergency Contacts table
CREATE TABLE emergency_contacts (
    id SERIAL PRIMARY KEY,
    patient_id TEXT REFERENCES patients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relationship TEXT,
    phone TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO patients (id, name, room, ward, doctor, condition, admission_date, clearance_status, medications, allergies, emergency_contacts) VALUES
('P001', 'John Smith', 'A101', 'Emergency Ward', 'Dr. Sarah Johnson', 'Stable', '2024-01-15', 'pending', 
 '["Lisinopril 10mg", "Metformin 500mg"]', '["Penicillin", "Shellfish"]',
 '[{"name": "Mary Smith", "relationship": "Wife", "phone": "555-1234", "email": "mary.smith@email.com"}]'),
('P002', 'Maria Garcia', 'B205', 'Pediatrics Ward', 'Dr. Michael Chen', 'Stable', '2024-01-20', 'approved',
 '["Amoxicillin 250mg"]', '["None known"]',
 '[{"name": "Carlos Garcia", "relationship": "Father", "phone": "555-2001", "email": "carlos.garcia@email.com"}]');

INSERT INTO staff (id, name, position, department, shift, status) VALUES
('S001', 'Sarah Johnson', 'Registered Nurse', 'Emergency', 'Day Shift', 'active'),
('S002', 'Michael Chen', 'Licensed Practical Nurse', 'Pediatrics', 'Night Shift', 'active'),
('S003', 'Emily Rodriguez', 'Registered Nurse', 'Cardiac Care', 'Day Shift', 'off');

INSERT INTO job_applications (name, email, phone, position, department, experience, education, status, applied_date) VALUES
('Jennifer Wilson', 'jennifer.wilson@email.com', '555-0101', 'Registered Nurse', 'Emergency', '3-5 years', 'BSN from State University, RN License', 'pending', '2024-01-10'),
('Robert Brown', 'robert.brown@email.com', '555-0102', 'Licensed Practical Nurse', 'Cardiac Care', '1-2 years', 'LPN Certificate from Community College', 'pending', '2024-01-12');

INSERT INTO wards (id, name, capacity, occupied, status, head_nurse) VALUES
('W001', 'Emergency Ward', 20, 18, 'active', 'Sarah Johnson'),
('W002', 'Cardiac Care Unit', 15, 12, 'active', 'Michael Chen'),
('W003', 'Pediatrics Ward', 25, 8, 'active', 'Emily Davis'),
('W004', 'Surgical Recovery', 30, 22, 'active', 'David Wilson'),
('W005', 'Maternity Ward', 18, 5, 'maintenance', 'Lisa Anderson');
```

## Step 5: Enable Real-time (Optional)

In **Database** → **Replication**:
1. Enable replication for tables you want real-time updates
2. This allows automatic UI updates when data changes

## Step 6: Test Connection

After updating your credentials, the app should connect to Supabase automatically. Check the browser console for any connection errors.

## Security Notes

- The anon key is safe to use in frontend code
- Row Level Security (RLS) should be configured for production
- Consider adding authentication for admin features

## Troubleshooting

- **Connection errors**: Check URL and key are correct
- **CORS errors**: Supabase handles CORS automatically
- **Data not loading**: Check table names match exactly
- **Permission errors**: Ensure RLS policies allow your operations
