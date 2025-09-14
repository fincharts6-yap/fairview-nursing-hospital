import React, { useState, useEffect } from 'react';
import './App.css';
import './AdminStyles.css';
import { supabaseService } from './supabaseClient';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import { validateJobApplication, validatePatientData } from './components/FormValidator';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminSection, setAdminSection] = useState('dashboard');
  const [isPatientPortal, setIsPatientPortal] = useState(false);
  const [patientLoggedIn, setPatientLoggedIn] = useState(false);
  const [patientSection, setPatientSection] = useState('dashboard');
  const [showJobApplication, setShowJobApplication] = useState(false);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for data from Supabase
  const [jobApplications, setJobApplications] = useState([]);
  const [patients, setPatients] = useState([]);
  const [wards, setWards] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from Supabase on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [patientsData, staffData, applicationsData, wardsData] = await Promise.all([
        supabaseService.getPatients(),
        supabaseService.getStaff(),
        supabaseService.getJobApplications(),
        supabaseService.getWards()
      ]);
      
      setPatients(patientsData || []);
      setStaff(staffData || []);
      setJobApplications(applicationsData || []);
      setWards(wardsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error loading data from database. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const [showAddWard, setShowAddWard] = useState(false);
  const [editingWard, setEditingWard] = useState(null);
  const [showInterviewScheduler, setShowInterviewScheduler] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showPatientRegistration, setShowPatientRegistration] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner message="Loading Hospital Data..." size="large" />;
    }

    switch (activeSection) {
      case 'home':
        return (
          <div className="hero-section">
            <div className="hero-content">
              <div className="hero-icon">🏥</div>
              <h1>Welcome to Fairview Nursing Hospital</h1>
              <h2>Tendwet, Kenya</h2>
              <p>Providing exceptional nursing care and healthcare services with compassion, dedication, and clinical excellence to the Tendwet community</p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Emergency Care</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Expert Nurses</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
              </div>
              <div className="hero-buttons">
                <button 
                  className="btn-primary pulse" 
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Patient Registration clicked');
                    setShowPatientRegistration(true);
                  }}
                  style={{ pointerEvents: 'auto' }}
                >
                  <span>📝</span> New Patient Registration
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Patient Portal clicked');
                    setIsPatientPortal(true);
                  }}
                  style={{ pointerEvents: 'auto' }}
                >
                  <span>🏥</span> Existing Patient Portal
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Job Application clicked');
                    setShowJobApplication(true);
                  }}
                  style={{ pointerEvents: 'auto' }}
                >
                  <span>💼</span> Apply for Jobs
                </button>
              </div>
            </div>
          </div>
        );
      case 'services':
        return (
          <div className="services-section">
            <div className="section-header">
              <h2>Our Nursing Services</h2>
              <p>Comprehensive healthcare services delivered by our skilled nursing team</p>
            </div>
            <div className="services-grid">
              <div className="service-card interactive-card">
                <div className="service-icon">🚨</div>
                <h3>Emergency Nursing Care</h3>
                <p>24/7 critical care nursing with rapid response teams and advanced life support</p>
                <div className="service-features">
                  <span className="feature-tag">24/7 Available</span>
                  <span className="feature-tag">Critical Care</span>
                </div>
              </div>
              <div className="service-card interactive-card">
                <div className="service-icon">🏥</div>
                <h3>Surgical Nursing</h3>
                <p>Pre and post-operative nursing care with specialized surgical support teams</p>
                <div className="service-features">
                  <span className="feature-tag">Pre-Op Care</span>
                  <span className="feature-tag">Post-Op Recovery</span>
                </div>
              </div>
              <div className="service-card interactive-card">
                <div className="service-icon">❤️</div>
                <h3>Cardiac Nursing</h3>
                <p>Specialized cardiovascular nursing care and heart health monitoring</p>
                <div className="service-features">
                  <span className="feature-tag">Heart Monitoring</span>
                  <span className="feature-tag">Cardiac Rehab</span>
                </div>
              </div>
              <div className="service-card interactive-card">
                <div className="service-icon">👶</div>
                <h3>Pediatric Nursing</h3>
                <p>Gentle, specialized nursing care for infants, children, and adolescents</p>
                <div className="service-features">
                  <span className="feature-tag">Child-Friendly</span>
                  <span className="feature-tag">Family Care</span>
                </div>
              </div>
              <div className="service-card interactive-card">
                <div className="service-icon">🏠</div>
                <h3>Home Nursing</h3>
                <p>Professional nursing care in the comfort of your own home</p>
                <div className="service-features">
                  <span className="feature-tag">In-Home Care</span>
                  <span className="feature-tag">Personalized</span>
                </div>
              </div>
              <div className="service-card interactive-card">
                <div className="service-icon">👵</div>
                <h3>Geriatric Nursing</h3>
                <p>Compassionate care for elderly patients with complex health needs</p>
                <div className="service-features">
                  <span className="feature-tag">Elder Care</span>
                  <span className="feature-tag">Chronic Care</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="contact-section">
            <div className="section-header">
              <h2>Contact Our Nursing Team</h2>
              <p>Get in touch with our professional nursing staff</p>
            </div>
            <div className="contact-info">
              <div className="contact-item interactive-card">
                <div className="contact-icon">📍</div>
                <h3>Hospital Address</h3>
                <p>Fairview Nursing Hospital<br />Tendwet Town, Bomet County<br />Kenya</p>
                <button className="contact-btn" onClick={() => window.open('https://maps.google.com/?q=Tendwet+Bomet+Kenya', '_blank')}>Get Directions</button>
              </div>
              <div className="contact-item interactive-card">
                <div className="contact-icon">📞</div>
                <h3>Phone Numbers</h3>
                <p>Emergency: +254 700 123 456<br />General: +254 700 123 457</p>
                <button className="contact-btn" onClick={() => window.open('tel:+254700123456', '_self')}>Call Now</button>
              </div>
              <div className="contact-item interactive-card">
                <div className="contact-icon">🕒</div>
                <h3>Operating Hours</h3>
                <p>Emergency Nursing: 24/7<br />General Services: Mon-Fri 6AM-10PM</p>
                <button className="contact-btn" onClick={() => alert('Visit scheduling system would be integrated here. Please call +254 700 123 457 to schedule.')}>Schedule Visit</button>
              </div>
            </div>
            <div className="emergency-banner">
              <div className="emergency-content">
                <span className="emergency-icon">🚨</span>
                <div className="emergency-text">
                  <h3>Emergency Nursing Care</h3>
                  <p>Our emergency nursing team is available 24/7 for critical care</p>
                </div>
                <button className="emergency-btn pulse" onClick={() => window.open('tel:+254700123456', '_self')}>Call Emergency</button>
              </div>
            </div>
            
            <div className="career-opportunities">
              <div className="career-header">
                <h3>🌟 Join Our Nursing Team</h3>
                <p>Explore career opportunities at Fairview Nursing Hospital</p>
              </div>
              <div className="career-actions">
                <button 
                  className="career-btn"
                  onClick={() => setShowJobApplication(true)}
                >
                  <span>💼</span> Apply for Nursing Positions
                </button>
                <button 
                  className="career-btn patient-portal-btn"
                  onClick={() => setIsPatientPortal(true)}
                >
                  <span>🏥</span> Patient Portal Access
                </button>
              </div>
            </div>
          </div>
        );
      case 'admin':
        return isAdminLoggedIn ? renderAdminDashboard() : renderAdminLogin();
      default:
        return null;
    }
  };

  const renderAdminLogin = () => {
    const handleAdminLogin = (e) => {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;
      
      // Simple demo authentication (in production, use proper authentication)
      if (username === 'admin' && password === 'nesh md') {
        setIsAdminLoggedIn(true);
        setAdminSection('dashboard');
      } else {
        alert('Invalid credentials. Try: admin / nesh md');
      }
    };

    return (
      <div className="admin-login-section">
        <div className="admin-login-container">
          <div className="admin-login-header">
            <div className="admin-icon">🔐</div>
            <h2>Admin Access</h2>
            <p>Fairview Nursing Hospital Administration</p>
          </div>
          <form onSubmit={handleAdminLogin} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                placeholder="Enter admin username"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Enter admin password"
                required 
              />
            </div>
            <button type="submit" className="admin-login-btn">
              <span>🏥</span> Access Admin Panel
            </button>
          </form>
          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Username: <code>admin</code></p>
            <p>Password: <code>nesh md</code></p>
          </div>
        </div>
      </div>
    );
  };

  const renderAdminDashboard = () => {
    const handleLogout = () => {
      setIsAdminLoggedIn(false);
      setActiveSection('home');
    };

    const renderAdminContent = () => {
      switch (adminSection) {
        case 'dashboard':
          return (
            <div className="admin-content">
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="stat-icon">👩‍⚕️</div>
                  <div className="stat-info">
                    <h3>Active Nurses</h3>
                    <span className="stat-number">47</span>
                    <span className="stat-change positive">+3 this week</span>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon">🛏️</div>
                  <div className="stat-info">
                    <h3>Occupied Beds</h3>
                    <span className="stat-number">89/120</span>
                    <span className="stat-change neutral">74% capacity</span>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon">📅</div>
                  <div className="stat-info">
                    <h3>Today's Appointments</h3>
                    <span className="stat-number">34</span>
                    <span className="stat-change positive">+12% vs yesterday</span>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon">🚨</div>
                  <div className="stat-info">
                    <h3>Emergency Cases</h3>
                    <span className="stat-number">7</span>
                    <span className="stat-change negative">2 critical</span>
                  </div>
                </div>
              </div>
              
              <div className="admin-quick-actions">
                <h3>Quick Actions</h3>
                <div className="quick-actions-grid">
                  <button className="quick-action-btn">
                    <span>👩‍⚕️</span> Add New Nurse
                  </button>
                  <button className="quick-action-btn">
                    <span>📅</span> Schedule Appointment
                  </button>
                  <button className="quick-action-btn">
                    <span>🚨</span> Emergency Alert
                  </button>
                  <button className="quick-action-btn">
                    <span>📊</span> Generate Report
                  </button>
                </div>
              </div>
            </div>
          );
        case 'staff':
          return (
            <div className="admin-content">
              <div className="staff-management">
                <div className="section-header">
                  <h3>Staff Management</h3>
                  <button className="add-staff-btn" onClick={() => setShowAddStaff(true)}>+ Add New Staff</button>
                </div>
                <div className="staff-table">
                  <div className="staff-row header">
                    <span>Name</span>
                    <span>Department</span>
                    <span>Shift</span>
                    <span>Status</span>
                    <span>Actions</span>
                  </div>
                  {staff.map(member => (
                    <div key={member.id} className="staff-row">
                      <span>{member.name}</span>
                      <span>{member.department}</span>
                      <span>{member.shift}</span>
                      <span className={`status ${member.status}`}>{member.status}</span>
                      <span className="actions">
                        <button onClick={() => alert(`Staff Profile - ${member.name}\n\nID: ${member.id}\nDepartment: ${member.department}\nShift: ${member.shift}\nStatus: ${member.status}\nPosition: ${member.position}\nPhone: ${member.phone || 'N/A'}\nEmail: ${member.email || 'N/A'}`)}>👁️</button>
                        <button onClick={() => setEditingStaff(member)}>📝</button>
                        <button onClick={async () => { 
                          if (confirm(`Remove ${member.name} from staff?`)) {
                            try {
                              await supabaseService.deleteStaff(member.id);
                              setStaff(prev => prev.filter(s => s.id !== member.id));
                              alert(`${member.name} removed from staff roster`);
                            } catch (error) {
                              alert('Error removing staff member.');
                            }
                          }
                        }}>🗑️</button>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 'patients':
          return (
            <div className="admin-content">
              <div className="patient-management">
                <div className="section-header">
                  <h3>Patient Management</h3>
                  <button className="add-patient-btn" onClick={() => setShowPatientRegistration(true)}>+ Admit New Patient</button>
                </div>
                <div className="patient-cards">
                  {patients.map(patient => (
                    <div key={patient.id} className="patient-card detailed">
                      <div className="patient-header">
                        <h4>{patient.name} <span className="patient-id">({patient.patient_id || patient.id})</span></h4>
                        <span className={`patient-status ${(patient.condition || 'stable').toLowerCase()}`}>{patient.condition || 'Stable'}</span>
                      </div>
                      <div className="patient-details">
                        <p><strong>Age:</strong> {patient.age} • <strong>Gender:</strong> {patient.gender}</p>
                        <p><strong>Phone:</strong> {patient.phone} • <strong>Email:</strong> {patient.email || 'N/A'}</p>
                        <p><strong>Address:</strong> {patient.address}</p>
                        <p><strong>Admitted:</strong> {patient.admission_date}</p>
                        <p><strong>Clearance:</strong> <span className={`clearance-status ${patient.clearance_status}`}>{patient.clearance_status}</span></p>
                      </div>
                      <div className="patient-medical-info">
                        <p><strong>Medical History:</strong> {patient.medical_history || 'None recorded'}</p>
                        <p><strong>Allergies:</strong> {patient.allergies || 'None recorded'}</p>
                        <p><strong>Current Medications:</strong> {patient.current_medications || 'None recorded'}</p>
                      </div>
                      <div className="emergency-contacts-info">
                        <p><strong>Next of Kin:</strong> {patient.next_of_kin}</p>
                        <p><strong>Emergency Contact:</strong> {patient.next_of_kin_phone}</p>
                      </div>
                      <div className="emergency-contacts-preview">
                        <strong>Emergency Contacts:</strong>
                        {(patient.emergency_contacts || []).map((contact, idx) => (
                          <span key={idx} className="contact-preview">{contact.name} ({contact.relationship})</span>
                        ))}
                      </div>
                      <div className="patient-actions">
                        <button onClick={() => alert(`Full Patient Details - ${patient.name}\n\nPatient ID: ${patient.patient_id || patient.id}\nAge: ${patient.age}\nGender: ${patient.gender}\nPhone: ${patient.phone}\nEmail: ${patient.email || 'N/A'}\nAddress: ${patient.address}\nAdmission Date: ${patient.admission_date}\nClearance Status: ${patient.clearance_status}\n\nMedical Information:\nMedical History: ${patient.medical_history || 'None recorded'}\nAllergies: ${patient.allergies || 'None recorded'}\nCurrent Medications: ${patient.current_medications || 'None recorded'}\n\nEmergency Contact:\nNext of Kin: ${patient.next_of_kin}\nPhone: ${patient.next_of_kin_phone}`)}>📋 Full Chart</button>
                        <button onClick={() => alert(`${patient.name} Medications:\n${(patient.medications || []).map(med => `• ${med}`).join('\n')}\n\nClick 'Add Medication' to prescribe new medication.`)}>💊 Medications</button>
                        <button onClick={() => alert(`${patient.name} Emergency Contacts:\n${(patient.emergency_contacts || []).map(contact => `• ${contact.name} (${contact.relationship}): ${contact.phone}`).join('\n')}`)}>👥 Contacts</button>
                        <button onClick={async () => {
                          if (patient.clearance_status === 'pending') {
                            const approve = confirm(`Approve discharge clearance for ${patient.name}?`);
                            if (approve) {
                              try {
                                await supabaseService.updatePatient(patient.id, { clearance_status: 'approved' });
                                setPatients(prev => prev.map(p => p.id === patient.id ? {...p, clearance_status: 'approved'} : p));
                                alert(`Discharge clearance approved for ${patient.name}`);
                              } catch (error) {
                                alert('Error updating clearance status.');
                              }
                            }
                          } else {
                            alert(`${patient.name} clearance status: ${patient.clearance_status}`);
                          }
                        }}>✅ Clearance</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 'applicants':
          return (
            <div className="admin-content">
              <div className="applicants-management">
                <div className="section-header">
                  <h3>Job Applications</h3>
                  <div className="applicant-stats">
                    <span className="stat-badge pending">{jobApplications.filter(app => app.status === 'pending').length} Pending</span>
                    <span className="stat-badge approved">{jobApplications.filter(app => app.status === 'approved').length} Approved</span>
                    <span className="stat-badge rejected">{jobApplications.filter(app => app.status === 'rejected').length} Rejected</span>
                  </div>
                </div>
                <div className="applicants-grid">
                  {jobApplications.map(applicant => (
                    <div key={applicant.id} className="applicant-card">
                      <div className="applicant-header">
                        <h4>{applicant.name}</h4>
                        <span className={`application-status ${applicant.status}`}>{applicant.status}</span>
                      </div>
                      <div className="applicant-details">
                        <p><strong>Position:</strong> {applicant.position}</p>
                        <p><strong>Department:</strong> {applicant.department}</p>
                        <p><strong>Experience:</strong> {applicant.experience}</p>
                        <p><strong>Education:</strong> {applicant.education}</p>
                        <p><strong>Applied:</strong> {applicant.applied_date}</p>
                        <p><strong>Contact:</strong> {applicant.phone} • {applicant.email}</p>
                      </div>
                      {applicant.status === 'pending' && (
                        <div className="applicant-actions">
                          <button 
                            className="approve-btn"
                            onClick={async () => {
                              try {
                                await supabaseService.updateJobApplication(applicant.id, { status: 'approved' });
                                setJobApplications(prev => prev.map(app => 
                                  app.id === applicant.id ? {...app, status: 'approved'} : app
                                ));
                              } catch (error) {
                                alert('Error updating application status.');
                              }
                            }}
                          >
                            ✅ Approve
                          </button>
                          <button 
                            className="reject-btn"
                            onClick={async () => {
                              try {
                                await supabaseService.updateJobApplication(applicant.id, { status: 'rejected' });
                                setJobApplications(prev => prev.map(app => 
                                  app.id === applicant.id ? {...app, status: 'rejected'} : app
                                ));
                              } catch (error) {
                                alert('Error updating application status.');
                              }
                            }}
                          >
                            ❌ Reject
                          </button>
                          <button 
                            className="interview-btn"
                            onClick={() => {
                              setSelectedApplicant(applicant);
                              setShowInterviewScheduler(true);
                            }}
                          >
                            📞 Schedule Interview
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 'wards':
          return (
            <div className="admin-content">
              <div className="wards-management">
                <div className="section-header">
                  <h3>Ward Management</h3>
                  <button className="add-ward-btn" onClick={() => setShowAddWard(true)}>+ Add New Ward</button>
                </div>
                <div className="wards-grid">
                  {wards.map(ward => (
                    <div key={ward.id} className="ward-card">
                      <div className="ward-header">
                        <h4>{ward.name}</h4>
                        <span className={`ward-status ${ward.status}`}>{ward.status}</span>
                      </div>
                      <div className="ward-stats">
                        <div className="capacity-bar">
                          <div className="capacity-fill" style={{width: `${(ward.occupied/ward.capacity)*100}%`}}></div>
                        </div>
                        <p><strong>Occupancy:</strong> {ward.occupied}/{ward.capacity} ({Math.round((ward.occupied/ward.capacity)*100)}%)</p>
                        <p><strong>Head Nurse:</strong> {ward.head_nurse}</p>
                      </div>
                      <div className="ward-actions">
                        <button onClick={() => alert(`Staff for ${ward.name}:\n• Head Nurse: ${ward.head_nurse}\n• Registered Nurses: 4\n• Licensed Practical Nurses: 2\n• Nursing Assistants: 3`)}>👥 View Staff</button>
                        <button onClick={async () => {
                          const newOccupied = prompt(`Current occupancy: ${ward.occupied}/${ward.capacity}\nEnter new occupancy:`, ward.occupied);
                          if (newOccupied && !isNaN(newOccupied) && newOccupied >= 0 && newOccupied <= ward.capacity) {
                            try {
                              await supabaseService.updateWard(ward.id, { occupied: parseInt(newOccupied) });
                              setWards(prev => prev.map(w => w.id === ward.id ? {...w, occupied: parseInt(newOccupied)} : w));
                            } catch (error) {
                              alert('Error updating ward occupancy.');
                            }
                          }
                        }}>🛏️ Manage Beds</button>
                        <button onClick={() => alert(`${ward.name} Reports:\n• Average Length of Stay: 3.2 days\n• Patient Satisfaction: 4.8/5\n• Readmission Rate: 2.1%\n• Staff Efficiency: 94%`)}>📊 Reports</button>
                        <button onClick={() => setEditingWard(ward)} className="edit-ward-btn">✏️ Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        default:
          return <div>Select a section from the sidebar</div>;
      }
    };

    return (
      <div className="admin-dashboard">
        <div className="admin-sidebar">
          <div className="admin-header">
            <div className="admin-logo">
              <span>🏥</span>
              <div>
                <h3>Admin Panel</h3>
                <p>Fairview Nursing</p>
              </div>
            </div>
          </div>
          <nav className="admin-nav">
            <button 
              className={adminSection === 'dashboard' ? 'admin-nav-btn active' : 'admin-nav-btn'}
              onClick={() => setAdminSection('dashboard')}
            >
              <span>📊</span> Dashboard
            </button>
            <button 
              className={adminSection === 'staff' ? 'admin-nav-btn active' : 'admin-nav-btn'}
              onClick={() => setAdminSection('staff')}
            >
              <span>👩‍⚕️</span> Staff Management
            </button>
            <button 
              className={adminSection === 'patients' ? 'admin-nav-btn active' : 'admin-nav-btn'}
              onClick={() => setAdminSection('patients')}
            >
              <span>🏥</span> Patients
            </button>
            <button 
              className={adminSection === 'applicants' ? 'admin-nav-btn active' : 'admin-nav-btn'}
              onClick={() => setAdminSection('applicants')}
            >
              <span>📝</span> Job Applicants
            </button>
            <button 
              className={adminSection === 'wards' ? 'admin-nav-btn active' : 'admin-nav-btn'}
              onClick={() => setAdminSection('wards')}
            >
              <span>🏥</span> Ward Management
            </button>
            <button 
              className={adminSection === 'reports' ? 'admin-nav-btn active' : 'admin-nav-btn'}
              onClick={() => setAdminSection('reports')}
            >
              <span>📈</span> Reports
            </button>
          </nav>
          <div className="admin-logout">
            <button onClick={handleLogout} className="logout-btn">
              <span>🚪</span> Logout
            </button>
          </div>
        </div>
        <div className="admin-main">
          <div className="admin-topbar">
            <h2>Hospital Administration</h2>
            <div className="admin-user-info">
              <span>👤 Admin User</span>
              <span className="admin-time">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          {renderAdminContent()}
        </div>
      </div>
    );
  };

  const renderJobApplication = () => {

    const handleJobSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setFormErrors({});
      
      const formData = new FormData(e.target);
      const applicationData = {
        name: formData.get('fullName'),
        position: formData.get('position'),
        department: formData.get('department'),
        experience: formData.get('experience'),
        education: formData.get('education'),
        phone: formData.get('phone'),
        email: formData.get('email')
      };

      // Validate form data
      const validation = validateJobApplication(applicationData);
      if (!validation.isValid) {
        setFormErrors(validation.errors);
        setIsSubmitting(false);
        return;
      }

      try {
        const newApplication = await supabaseService.addJobApplication(applicationData);
        setJobApplications(prev => [...prev, newApplication]);
        setShowJobApplication(false);
        alert('Application submitted successfully! You will be contacted within 48 hours.');
      } catch (error) {
        console.error('Error submitting application:', error);
        alert('Error submitting application. Please check your connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="job-application-overlay">
        <div className="job-application-container">
          <div className="job-application-header">
            <h2>🩺 Apply for Nursing Position</h2>
            <button 
              className="close-btn"
              onClick={() => setShowJobApplication(false)}
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleJobSubmit} className="job-application-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="fullName" 
                  required 
                  className={formErrors.name ? 'error' : ''}
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number * (Kenyan format: +254 or 07/01)</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  placeholder="+254 700 123 456"
                  className={formErrors.phone ? 'error' : ''}
                />
                {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
              </div>
              <div className="form-group">
                <label>Years of Experience *</label>
                <select 
                  name="experience" 
                  required
                  className={formErrors.experience ? 'error' : ''}
                >
                  <option value="">Select experience</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="2-3 years">2-3 years</option>
                  <option value="4-5 years">4-5 years</option>
                  <option value="6+ years">6+ years</option>
                </select>
                {formErrors.experience && <span className="error-message">{formErrors.experience}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Position Applied For *</label>
                <select name="position" required>
                  <option value="">Select position</option>
                  <option value="Registered Nurse">Registered Nurse (RN)</option>
                  <option value="Licensed Practical Nurse">Licensed Practical Nurse (LPN)</option>
                  <option value="Nurse Manager">Nurse Manager</option>
                  <option value="Charge Nurse">Charge Nurse</option>
                  <option value="Clinical Nurse Specialist">Clinical Nurse Specialist</option>
                </select>
              </div>
              <div className="form-group">
                <label>Preferred Department *</label>
                <select name="department" required>
                  <option value="">Select department</option>
                  <option value="Emergency">Emergency Department</option>
                  <option value="Cardiac Care">Cardiac Care Unit</option>
                  <option value="Pediatrics">Pediatrics Ward</option>
                  <option value="Surgical Recovery">Surgical Recovery</option>
                  <option value="Maternity">Maternity Ward</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Education & Certifications *</label>
              <textarea name="education" rows="3" placeholder="List your nursing education, degrees, and certifications..." required></textarea>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setShowJobApplication(false)} className="cancel-btn">
                Cancel
              </button>
              <button 
                type="submit" 
                className="job-submit-btn"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? '⏳' : '📝'}</span> 
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderPatientPortal = () => {
    const handlePatientLogin = (e) => {
      e.preventDefault();
      const patientId = e.target.patientId.value;
      const dob = e.target.dob.value;
      
      // Simple demo authentication
      const patient = patients.find(p => p.id === patientId);
      if (patient) {
        setPatientLoggedIn(true);
        setPatientSection('dashboard');
      } else {
        alert('Invalid Patient ID. Try: P001 or P002');
      }
    };

    const renderPatientDashboard = () => {
      const currentPatient = patients.find(p => p.id === 'P001'); // Demo patient
      
      return (
        <div className="patient-portal-dashboard">
          <div className="patient-header">
            <h2>Welcome, {currentPatient.name}</h2>
            <button onClick={() => { setPatientLoggedIn(false); setIsPatientPortal(false); }} className="logout-btn">
              🚪 Logout
            </button>
          </div>
          <div className="patient-info-grid">
            <div className="patient-info-card">
              <h3>📋 Current Admission</h3>
              <p><strong>Patient ID:</strong> {currentPatient.id}</p>
              <p><strong>Room:</strong> {currentPatient.room}</p>
              <p><strong>Ward:</strong> {currentPatient.ward}</p>
              <p><strong>Attending Doctor:</strong> {currentPatient.doctor}</p>
              <p><strong>Admission Date:</strong> {currentPatient.admissionDate}</p>
              <p><strong>Current Status:</strong> <span className={`status ${currentPatient.condition.toLowerCase()}`}>{currentPatient.condition}</span></p>
            </div>
            <div className="patient-info-card">
              <h3>💊 Current Medications</h3>
              {currentPatient.medications.map((med, idx) => (
                <p key={idx}>• {med}</p>
              ))}
            </div>
            <div className="patient-info-card">
              <h3>⚠️ Allergies</h3>
              {currentPatient.allergies.map((allergy, idx) => (
                <p key={idx} className="allergy">• {allergy}</p>
              ))}
            </div>
            <div className="patient-info-card">
              <h3>👥 Emergency Contacts</h3>
              {currentPatient.emergencyContacts.map((contact, idx) => (
                <div key={idx} className="emergency-contact">
                  <p><strong>{contact.name}</strong> ({contact.relationship})</p>
                  <p>📞 {contact.phone}</p>
                  <p>✉️ {contact.email}</p>
                </div>
              ))}
              <button 
                className="add-contact-btn"
                onClick={() => {
                  const name = prompt('Enter contact name:');
                  const relationship = prompt('Enter relationship:');
                  const phone = prompt('Enter phone number:');
                  const email = prompt('Enter email address:');
                  
                  if (name && relationship && phone && email) {
                    const currentPatient = patients.find(p => p.id === 'P001');
                    const updatedContacts = [...currentPatient.emergencyContacts, { name, relationship, phone, email }];
                    setPatients(prev => prev.map(p => 
                      p.id === 'P001' ? {...p, emergencyContacts: updatedContacts} : p
                    ));
                    alert('Emergency contact added successfully!');
                  }
                }}
              >
                + Add Emergency Contact
              </button>
            </div>
          </div>
          <div className="clearance-section">
            <h3>🏥 Discharge Clearance Status</h3>
            <div className="clearance-status-card">
              <p><strong>Current Status:</strong> <span className={`clearance-status ${currentPatient.clearanceStatus}`}>{currentPatient.clearanceStatus}</span></p>
              {currentPatient.clearanceStatus === 'pending' && (
                <p>Your discharge clearance is being processed. Please wait for medical team approval.</p>
              )}
              {currentPatient.clearanceStatus === 'approved' && (
                <div>
                  <p>✅ You have been cleared for discharge!</p>
                  <button className="discharge-btn">📋 View Discharge Instructions</button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    if (!patientLoggedIn) {
      return (
        <div className="patient-portal-overlay">
          <div className="patient-login-container">
            <div className="patient-login-header">
              <h2>🏥 Patient Portal Access</h2>
              <button 
                className="close-btn"
                onClick={() => setIsPatientPortal(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handlePatientLogin} className="patient-login-form">
              <div className="form-group">
                <label>Patient ID</label>
                <input type="text" name="patientId" placeholder="Enter your Patient ID (e.g., P001)" required />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="dob" required />
              </div>
              <button type="submit" className="patient-login-btn">
                🔐 Access My Portal
              </button>
            </form>
            <div className="demo-info">
              <p><strong>Demo Patient IDs:</strong> P001, P002</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="patient-portal-overlay">
        <div className="patient-portal-container">
          {renderPatientDashboard()}
        </div>
      </div>
    );
  };

  const renderAddWardModal = () => {
    const handleAddWard = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newWard = {
        id: `W${String(wards.length + 1).padStart(3, '0')}`,
        name: formData.get('wardName'),
        capacity: parseInt(formData.get('capacity')),
        occupied: 0,
        status: 'active',
        headNurse: formData.get('headNurse')
      };
      
      setWards(prev => [...prev, newWard]);
      setShowAddWard(false);
      alert(`Ward "${newWard.name}" added successfully!`);
    };

    return (
      <div className="job-application-overlay">
        <div className="job-application-container">
          <div className="job-application-header">
            <h2>🏥 Add New Ward</h2>
            <button className="close-btn" onClick={() => setShowAddWard(false)}>✕</button>
          </div>
          <form onSubmit={handleAddWard} className="job-application-form">
            <div className="form-group">
              <label>Ward Name *</label>
              <input type="text" name="wardName" required placeholder="e.g., Intensive Care Unit" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Bed Capacity *</label>
                <input type="number" name="capacity" required min="1" max="100" placeholder="20" />
              </div>
              <div className="form-group">
                <label>Head Nurse *</label>
                <input type="text" name="headNurse" required placeholder="Nurse Name" />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setShowAddWard(false)} className="cancel-btn">Cancel</button>
              <button type="submit" className="submit-btn">🏥 Add Ward</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderEditWardModal = () => {
    const handleEditWard = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const updatedWard = {
        ...editingWard,
        name: formData.get('wardName'),
        capacity: parseInt(formData.get('capacity')),
        headNurse: formData.get('headNurse'),
        status: formData.get('status')
      };
      
      setWards(prev => prev.map(w => w.id === editingWard.id ? updatedWard : w));
      setEditingWard(null);
      alert(`Ward "${updatedWard.name}" updated successfully!`);
    };

    return (
      <div className="job-application-overlay">
        <div className="job-application-container">
          <div className="job-application-header">
            <h2>✏️ Edit Ward</h2>
            <button className="close-btn" onClick={() => setEditingWard(null)}>✕</button>
          </div>
          <form onSubmit={handleEditWard} className="job-application-form">
            <div className="form-group">
              <label>Ward Name *</label>
              <input type="text" name="wardName" required defaultValue={editingWard.name} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Bed Capacity *</label>
                <input type="number" name="capacity" required min="1" max="100" defaultValue={editingWard.capacity} />
              </div>
              <div className="form-group">
                <label>Head Nurse *</label>
                <input type="text" name="headNurse" required defaultValue={editingWard.headNurse} />
              </div>
            </div>
            <div className="form-group">
              <label>Ward Status *</label>
              <select name="status" required defaultValue={editingWard.status}>
                <option value="active">Active</option>
                <option value="maintenance">Under Maintenance</option>
                <option value="closed">Temporarily Closed</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setEditingWard(null)} className="cancel-btn">Cancel</button>
              <button type="submit" className="submit-btn">💾 Update Ward</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderInterviewScheduler = () => {
    const handleScheduleInterview = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const interviewDate = formData.get('interviewDate');
      const interviewTime = formData.get('interviewTime');
      const interviewer = formData.get('interviewer');
      const notes = formData.get('notes');
      
      alert(`Interview Scheduled Successfully!\n\nApplicant: ${selectedApplicant.name}\nDate: ${interviewDate}\nTime: ${interviewTime}\nInterviewer: ${interviewer}\nNotes: ${notes}\n\nConfirmation email will be sent to ${selectedApplicant.email}`);
      
      setShowInterviewScheduler(false);
      setSelectedApplicant(null);
    };

    return (
      <div className="job-application-overlay">
        <div className="job-application-container">
          <div className="job-application-header">
            <h2>📞 Schedule Interview</h2>
            <button className="close-btn" onClick={() => { setShowInterviewScheduler(false); setSelectedApplicant(null); }}>✕</button>
          </div>
          <div className="applicant-info">
            <h3>Applicant: {selectedApplicant?.name}</h3>
            <p>Position: {selectedApplicant?.position} | Department: {selectedApplicant?.department}</p>
            <p>Experience: {selectedApplicant?.experience} | Email: {selectedApplicant?.email}</p>
          </div>
          <form onSubmit={handleScheduleInterview} className="job-application-form">
            <div className="form-row">
              <div className="form-group">
                <label>Interview Date *</label>
                <input type="date" name="interviewDate" required min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="form-group">
                <label>Interview Time *</label>
                <input type="time" name="interviewTime" required />
              </div>
            </div>
            <div className="form-group">
              <label>Interviewer *</label>
              <select name="interviewer" required>
                <option value="">Select Interviewer</option>
                <option value="Dr. Sarah Johnson">Dr. Sarah Johnson - Chief Nursing Officer</option>
                <option value="Michael Chen">Michael Chen - HR Manager</option>
                <option value="Emily Davis">Emily Davis - Department Head</option>
                <option value="David Wilson">David Wilson - Senior Nurse Manager</option>
              </select>
            </div>
            <div className="form-group">
              <label>Interview Notes</label>
              <textarea name="notes" rows="3" placeholder="Any special instructions or notes for the interview..."></textarea>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => { setShowInterviewScheduler(false); setSelectedApplicant(null); }} className="cancel-btn">Cancel</button>
              <button type="submit" className="submit-btn">📅 Schedule Interview</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderPatientRegistration = () => {
    const handleRegistrationSubmit = async (e) => {
      e.preventDefault();
      setIsRegistering(true);
      setFormErrors({});

      const formData = new FormData(e.target);
      const patientData = {
        patient_id: formData.get('patientId'),
        name: formData.get('fullName'),
        age: parseInt(formData.get('age')),
        gender: formData.get('gender'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: formData.get('address'),
        next_of_kin: formData.get('nextOfKin'),
        next_of_kin_phone: formData.get('nextOfKinPhone'),
        medical_history: formData.get('medicalHistory') || '',
        allergies: formData.get('allergies') || '',
        current_medications: formData.get('currentMedications') || '',
        admission_date: new Date().toISOString().split('T')[0],
        clearance_status: 'pending'
      };

      // Validate form data
      const validation = validatePatientData(patientData);
      if (!validation.isValid) {
        setFormErrors(validation.errors);
        setIsRegistering(false);
        return;
      }

      try {
        const newPatient = await supabaseService.addPatient(patientData);
        setPatients(prev => [...prev, newPatient]);
        setShowPatientRegistration(false);
        alert(`Registration successful! Your Patient ID is: ${patientData.patient_id}. Please keep this for future reference.`);
      } catch (error) {
        console.error('Error registering patient:', error);
        alert('Error during registration. Please check your information and try again.');
      } finally {
        setIsRegistering(false);
      }
    };

    return (
      <div className="overlay">
        <div className="modal patient-registration-modal">
          <div className="modal-header">
            <h2>📝 New Patient Registration</h2>
            <button onClick={() => setShowPatientRegistration(false)} className="close-btn">×</button>
          </div>
          <form onSubmit={handleRegistrationSubmit} className="registration-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="patientId">Patient ID *</label>
                <input 
                  type="text" 
                  id="patientId" 
                  name="patientId" 
                  placeholder="e.g., P003" 
                  required 
                />
                {formErrors.patient_id && <span className="error-message">{formErrors.patient_id}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  placeholder="Enter full name" 
                  required 
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="age">Age *</label>
                <input 
                  type="number" 
                  id="age" 
                  name="age" 
                  placeholder="Age" 
                  min="1" 
                  max="120" 
                  required 
                />
                {formErrors.age && <span className="error-message">{formErrors.age}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender *</label>
                <select id="gender" name="gender" required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formErrors.gender && <span className="error-message">{formErrors.gender}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="+254 722 659 180" 
                  required 
                />
                {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="email@example.com" 
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">Address *</label>
                <textarea 
                  id="address" 
                  name="address" 
                  placeholder="Full address including town/village" 
                  rows="2" 
                  required
                ></textarea>
                {formErrors.address && <span className="error-message">{formErrors.address}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="nextOfKin">Next of Kin *</label>
                <input 
                  type="text" 
                  id="nextOfKin" 
                  name="nextOfKin" 
                  placeholder="Emergency contact name" 
                  required 
                />
                {formErrors.next_of_kin && <span className="error-message">{formErrors.next_of_kin}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="nextOfKinPhone">Next of Kin Phone *</label>
                <input 
                  type="tel" 
                  id="nextOfKinPhone" 
                  name="nextOfKinPhone" 
                  placeholder="+254 700 123 456" 
                  required 
                />
                {formErrors.next_of_kin_phone && <span className="error-message">{formErrors.next_of_kin_phone}</span>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="medicalHistory">Medical History</label>
                <textarea 
                  id="medicalHistory" 
                  name="medicalHistory" 
                  placeholder="Previous medical conditions, surgeries, etc." 
                  rows="3"
                ></textarea>
              </div>

              <div className="form-group full-width">
                <label htmlFor="allergies">Known Allergies</label>
                <textarea 
                  id="allergies" 
                  name="allergies" 
                  placeholder="Food allergies, drug allergies, etc." 
                  rows="2"
                ></textarea>
              </div>

              <div className="form-group full-width">
                <label htmlFor="currentMedications">Current Medications</label>
                <textarea 
                  id="currentMedications" 
                  name="currentMedications" 
                  placeholder="Current medications and dosages" 
                  rows="2"
                ></textarea>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowPatientRegistration(false)} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn" disabled={isRegistering}>
                {isRegistering ? 'Registering...' : '📝 Register Patient'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Render Add Staff Modal
  const renderAddStaffModal = () => {
    return (
      <div className="overlay">
        <div className="modal staff-modal">
          <div className="modal-header">
            <h3>Add New Staff Member</h3>
            <button className="close-btn" onClick={() => setShowAddStaff(false)}>×</button>
          </div>
          <form onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setFormErrors({});
            
            const formData = new FormData(e.target);
            const staffData = {
              name: formData.get('name'),
              department: formData.get('department'),
              position: formData.get('position'),
              shift: formData.get('shift'),
              phone: formData.get('phone'),
              email: formData.get('email'),
              status: 'active'
            };

            // Basic validation
            if (!staffData.name || !staffData.department || !staffData.position || !staffData.shift) {
              setFormErrors({ general: 'Please fill in all required fields' });
              setIsSubmitting(false);
              return;
            }

            try {
              const newStaff = await supabaseService.addStaff(staffData);
              setStaff(prev => [...prev, newStaff]);
              setShowAddStaff(false);
              alert(`Staff member "${staffData.name}" added successfully!`);
            } catch (error) {
              console.error('Error adding staff:', error);
              setFormErrors({ general: 'Error adding staff member. Please try again.' });
            } finally {
              setIsSubmitting(false);
            }
          }}>
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" required />
            </div>
            
            <div className="form-group">
              <label>Department *</label>
              <select name="department" required>
                <option value="">Select Department</option>
                <option value="Emergency">Emergency</option>
                <option value="ICU">ICU</option>
                <option value="Surgery">Surgery</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Maternity">Maternity</option>
                <option value="General Ward">General Ward</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Administration">Administration</option>
              </select>
            </div>

            <div className="form-group">
              <label>Position *</label>
              <select name="position" required>
                <option value="">Select Position</option>
                <option value="Registered Nurse">Registered Nurse</option>
                <option value="Licensed Practical Nurse">Licensed Practical Nurse</option>
                <option value="Nursing Assistant">Nursing Assistant</option>
                <option value="Head Nurse">Head Nurse</option>
                <option value="Doctor">Doctor</option>
                <option value="Specialist">Specialist</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Lab Technician">Lab Technician</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>

            <div className="form-group">
              <label>Shift *</label>
              <select name="shift" required>
                <option value="">Select Shift</option>
                <option value="Day">Day (6AM - 6PM)</option>
                <option value="Night">Night (6PM - 6AM)</option>
                <option value="Evening">Evening (2PM - 10PM)</option>
                <option value="Rotating">Rotating</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" placeholder="+254 7XX XXX XXX" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" />
            </div>

            {formErrors.general && <div className="error-message">{formErrors.general}</div>}

            <div className="form-actions">
              <button type="button" onClick={() => setShowAddStaff(false)} disabled={isSubmitting}>Cancel</button>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Staff Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Render Edit Staff Modal
  const renderEditStaffModal = () => {
    if (!editingStaff) return null;
    
    return (
      <div className="overlay">
        <div className="modal staff-modal">
          <div className="modal-header">
            <h3>Edit Staff Member</h3>
            <button className="close-btn" onClick={() => setEditingStaff(null)}>×</button>
          </div>
          <form onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setFormErrors({});
            
            const formData = new FormData(e.target);
            const staffData = {
              name: formData.get('name'),
              department: formData.get('department'),
              position: formData.get('position'),
              shift: formData.get('shift'),
              phone: formData.get('phone'),
              email: formData.get('email'),
              status: formData.get('status')
            };

            try {
              const updatedStaff = await supabaseService.updateStaff(editingStaff.id, staffData);
              setStaff(prev => prev.map(s => s.id === editingStaff.id ? updatedStaff : s));
              setEditingStaff(null);
              alert(`Staff member "${staffData.name}" updated successfully!`);
            } catch (error) {
              console.error('Error updating staff:', error);
              setFormErrors({ general: 'Error updating staff member. Please try again.' });
            } finally {
              setIsSubmitting(false);
            }
          }}>
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" defaultValue={editingStaff.name} required />
            </div>
            
            <div className="form-group">
              <label>Department *</label>
              <select name="department" defaultValue={editingStaff.department} required>
                <option value="">Select Department</option>
                <option value="Emergency">Emergency</option>
                <option value="ICU">ICU</option>
                <option value="Surgery">Surgery</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Maternity">Maternity</option>
                <option value="General Ward">General Ward</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Administration">Administration</option>
              </select>
            </div>

            <div className="form-group">
              <label>Position *</label>
              <select name="position" defaultValue={editingStaff.position} required>
                <option value="">Select Position</option>
                <option value="Registered Nurse">Registered Nurse</option>
                <option value="Licensed Practical Nurse">Licensed Practical Nurse</option>
                <option value="Nursing Assistant">Nursing Assistant</option>
                <option value="Head Nurse">Head Nurse</option>
                <option value="Doctor">Doctor</option>
                <option value="Specialist">Specialist</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Lab Technician">Lab Technician</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>

            <div className="form-group">
              <label>Shift *</label>
              <select name="shift" defaultValue={editingStaff.shift} required>
                <option value="">Select Shift</option>
                <option value="Day">Day (6AM - 6PM)</option>
                <option value="Night">Night (6PM - 6AM)</option>
                <option value="Evening">Evening (2PM - 10PM)</option>
                <option value="Rotating">Rotating</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select name="status" defaultValue={editingStaff.status} required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on-leave">On Leave</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" defaultValue={editingStaff.phone} placeholder="+254 7XX XXX XXX" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" defaultValue={editingStaff.email} />
            </div>

            {formErrors.general && <div className="error-message">{formErrors.general}</div>}

            <div className="form-actions">
              <button type="button" onClick={() => setEditingStaff(null)} disabled={isSubmitting}>Cancel</button>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Staff Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">
            <span 
              className="nav-icon"
              onDoubleClick={() => {
                setActiveSection('admin');
                setIsAdminMode(true);
              }}
              style={{ cursor: 'pointer' }}
            >🏥</span>
            <span className="nav-title">Fairview Nursing Hospital - Tendwet</span>
          </div>
          <div className="nav-links">
            {/* Admin access hidden - double-click hospital icon to access */}
          </div>
        </nav>

        <main className="main-content">
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <button 
            className={activeSection === 'home' ? 'bottom-nav-btn active' : 'bottom-nav-btn'}
            onClick={() => {
              setActiveSection('home');
              setIsAdminMode(false);
              setIsPatientPortal(false);
              setShowJobApplication(false);
              setShowPatientRegistration(false);
            }}
          >
            <span className="bottom-nav-icon">🏠</span>
            <span className="bottom-nav-label">Home</span>
          </button>
          <button 
            className={activeSection === 'services' ? 'bottom-nav-btn active' : 'bottom-nav-btn'}
            onClick={() => {
              setActiveSection('services');
              setIsAdminMode(false);
              setIsPatientPortal(false);
              setShowJobApplication(false);
              setShowPatientRegistration(false);
            }}
          >
            <span className="bottom-nav-icon">🩺</span>
            <span className="bottom-nav-label">Services</span>
          </button>
          <button 
            className={activeSection === 'contact' ? 'bottom-nav-btn active' : 'bottom-nav-btn'}
            onClick={() => {
              setActiveSection('contact');
              setIsAdminMode(false);
              setIsPatientPortal(false);
              setShowJobApplication(false);
              setShowPatientRegistration(false);
            }}
          >
            <span className="bottom-nav-icon">📞</span>
            <span className="bottom-nav-label">Contact</span>
          </button>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>🏥 Fairview Nursing Hospital</h3>
              <p>Tendwet, Bomet County, Kenya</p>
              <p>Providing exceptional nursing care with compassion and clinical excellence.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#services">Our Services</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#careers">Careers</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact Info</h4>
              <p>📍 Tendwet Town, Bomet County</p>
              <p>📞 +254 722659180</p>
              <p>🚨 Emergency: +254 700 123 456</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Fairview Nursing Hospital, Tendwet. All rights reserved.</p>
          </div>
        </footer>

        {/* Overlays */}
        {showJobApplication && renderJobApplication()}
        {isPatientPortal && renderPatientPortal()}
        {showPatientRegistration && renderPatientRegistration()}
        {showAddStaff && renderAddStaffModal()}
        {editingStaff && renderEditStaffModal()}
        {showAddWard && renderAddWardModal()}
        {editingWard && renderEditWardModal()}
        {showInterviewScheduler && renderInterviewScheduler()}
      </div>
    </ErrorBoundary>
  );
}

export default App;
