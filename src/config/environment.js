// Environment configuration for production deployment
export const config = {
  hospital: {
    name: process.env.REACT_APP_HOSPITAL_NAME || 'Fairview Nursing Hospital',
    location: process.env.REACT_APP_HOSPITAL_LOCATION || 'Tendwet, Bomet County, Kenya',
    emergencyPhone: process.env.REACT_APP_EMERGENCY_PHONE || '+254700123456',
    generalPhone: process.env.REACT_APP_GENERAL_PHONE || '+254700123457',
    address: 'Fairview Nursing Hospital, Tendwet Town, Bomet County, Kenya'
  },
  
  supabase: {
    url: process.env.REACT_APP_SUPABASE_URL || 'https://qutrzppqcseozczxfryn.supabase.co',
    anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1dHJ6cHBxY3Nlb3pjenhmcnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NDMyMjcsImV4cCI6MjA3MzQxOTIyN30.nvOyyL5h50vQLQKGtJooapj37ECps0ln3C5WVO4Jl-U'
  },
  
  admin: {
    username: process.env.REACT_APP_ADMIN_USERNAME || 'admin',
    password: process.env.REACT_APP_ADMIN_PASSWORD || 'nesh md'
  },
  
  app: {
    name: 'Fairview Hospital Management System',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production'
  },
  
  features: {
    enableRetry: true,
    maxRetries: 3,
    retryDelay: 1000,
    enableErrorBoundary: true,
    enableFormValidation: true,
    enableLoadingStates: true
  }
};

export default config;
