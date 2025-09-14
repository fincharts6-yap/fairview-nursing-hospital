// Form validation utilities for Kenya-specific data
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateKenyanPhone = (phone) => {
  // Kenya phone format: +254 followed by 9 digits
  const phoneRegex = /^\+254\s?[17]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePatientId = (id) => {
  // Patient ID format: P followed by 3 digits
  const idRegex = /^P\d{3}$/;
  return idRegex.test(id);
};

export const validateName = (name) => {
  return name && name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

export const validateJobApplication = (formData) => {
  const errors = {};
  
  if (!validateRequired(formData.name)) {
    errors.name = 'Full name is required';
  } else if (!validateName(formData.name)) {
    errors.name = 'Please enter a valid name (letters only)';
  }
  
  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!validateRequired(formData.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid Kenyan phone number (+254 or 07/01)';
  }
  
  if (!validateRequired(formData.position)) {
    errors.position = 'Position is required';
  }
  
  if (!validateRequired(formData.department)) {
    errors.department = 'Department is required';
  }
  
  if (!validateRequired(formData.experience)) {
    errors.experience = 'Experience level is required';
  }
  
  if (!validateRequired(formData.education)) {
    errors.education = 'Education background is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validatePatientLogin = (patientId) => {
  if (!validateRequired(patientId)) {
    return { isValid: false, error: 'Patient ID is required' };
  }
  
  if (!validatePatientId(patientId)) {
    return { isValid: false, error: 'Please enter a valid Patient ID (format: P001)' };
  }
  
  return { isValid: true, error: null };
};

export const validateStaffData = (staffData) => {
  const errors = {};
  
  if (!validateRequired(staffData.name)) {
    errors.name = 'Staff name is required';
  } else if (!validateName(staffData.name)) {
    errors.name = 'Please enter a valid name';
  }
  
  if (!validateRequired(staffData.department)) {
    errors.department = 'Department is required';
  }
  
  if (!validateRequired(staffData.position)) {
    errors.position = 'Position is required';
  }
  
  if (!validateRequired(staffData.shift)) {
    errors.shift = 'Shift is required';
  }
  
  if (staffData.phone && !validatePhone(staffData.phone)) {
    errors.phone = 'Please enter a valid Kenyan phone number';
  }
  
  if (staffData.email && !validateEmail(staffData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validatePatientData = (data) => {
  const errors = {};
  let isValid = true;

  // Patient ID validation
  if (!data.patient_id || !validatePatientId(data.patient_id)) {
    errors.patient_id = 'Patient ID must be in format P001, P002, etc.';
    isValid = false;
  }

  // Name validation
  if (!data.name || !validateName(data.name)) {
    errors.name = 'Full name must be at least 2 characters long';
    isValid = false;
  }

  // Age validation
  if (!data.age || data.age < 1 || data.age > 120) {
    errors.age = 'Age must be between 1 and 120';
    isValid = false;
  }

  // Gender validation
  if (!data.gender || !['Male', 'Female', 'Other'].includes(data.gender)) {
    errors.gender = 'Please select a valid gender';
    isValid = false;
  }

  // Phone validation
  if (!data.phone || !validateKenyanPhone(data.phone)) {
    errors.phone = 'Phone number must be in Kenya format (+254 7XX XXX XXX)';
    isValid = false;
  }

  // Email validation (optional)
  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }

  // Address validation
  if (!data.address || data.address.trim().length < 10) {
    errors.address = 'Please provide a complete address';
    isValid = false;
  }

  // Next of kin validation
  if (!data.next_of_kin || !validateName(data.next_of_kin)) {
    errors.next_of_kin = 'Next of kin name is required';
    isValid = false;
  }

  // Next of kin phone validation
  if (!data.next_of_kin_phone || !validateKenyanPhone(data.next_of_kin_phone)) {
    errors.next_of_kin_phone = 'Next of kin phone must be in Kenya format (+254 7XX XXX XXX)';
    isValid = false;
  }

  return { isValid, errors };
};
