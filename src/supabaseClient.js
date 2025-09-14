import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://qutrzppqcseozczxfryn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1dHJ6cHBxY3Nlb3pjenhmcnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NDMyMjcsImV4cCI6MjA3MzQxOTIyN30.nvOyyL5h50vQLQKGtJooapj37ECps0ln3C5WVO4Jl-U'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database service functions
export const supabaseService = {
  // Patients
  async getPatients() {
    const { data, error } = await supabase
      .from('patients')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  async addPatient(patientData) {
    const { data, error } = await supabase
      .from('patients')
      .insert([patientData])
      .select()
    if (error) throw error
    return data[0]
  },

  async updatePatient(id, updates) {
    const { data, error } = await supabase
      .from('patients')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async deletePatient(id) {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  // Staff
  async getStaff() {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
    if (error) throw error
    return data
  },

  async addStaff(staff) {
    const { data, error } = await supabase
      .from('staff')
      .insert([staff])
      .select()
    if (error) throw error
    return data[0]
  },

  async updateStaff(id, updates) {
    const { data, error } = await supabase
      .from('staff')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async deleteStaff(id) {
    const { error } = await supabase
      .from('staff')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  // Job Applications
  async getJobApplications() {
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
    if (error) throw error
    return data
  },

  async addJobApplication(application) {
    const { data, error } = await supabase
      .from('job_applications')
      .insert([application])
      .select()
    if (error) throw error
    return data[0]
  },

  async updateJobApplication(id, updates) {
    const { data, error } = await supabase
      .from('job_applications')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  // Wards
  async getWards() {
    const { data, error } = await supabase
      .from('wards')
      .select('*')
    if (error) throw error
    return data
  },

  async addWard(ward) {
    const { data, error } = await supabase
      .from('wards')
      .insert([ward])
      .select()
    if (error) throw error
    return data[0]
  },

  async updateWard(id, updates) {
    const { data, error } = await supabase
      .from('wards')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  // Emergency Contacts
  async getEmergencyContacts(patientId) {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .select('*')
      .eq('patient_id', patientId)
    if (error) throw error
    return data
  },

  async addEmergencyContact(contact) {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .insert([contact])
      .select()
    if (error) throw error
    return data[0]
  },

  // Authentication
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }
}
