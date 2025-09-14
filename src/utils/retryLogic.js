// Production-ready retry logic for database operations
export const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await operation();
      return result;
    } catch (error) {
      lastError = error;
      console.warn(`Operation failed (attempt ${attempt}/${maxRetries}):`, error.message);
      
      if (attempt === maxRetries) {
        throw new Error(`Operation failed after ${maxRetries} attempts: ${error.message}`);
      }
      
      // Exponential backoff
      const waitTime = delay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  throw lastError;
};

export const withRetry = (supabaseService) => {
  return {
    async getPatients() {
      return retryOperation(() => supabaseService.getPatients());
    },
    
    async getStaff() {
      return retryOperation(() => supabaseService.getStaff());
    },
    
    async getJobApplications() {
      return retryOperation(() => supabaseService.getJobApplications());
    },
    
    async getWards() {
      return retryOperation(() => supabaseService.getWards());
    },
    
    async addJobApplication(data) {
      return retryOperation(() => supabaseService.addJobApplication(data));
    },
    
    async updateJobApplication(id, data) {
      return retryOperation(() => supabaseService.updateJobApplication(id, data));
    },
    
    async addStaff(data) {
      return retryOperation(() => supabaseService.addStaff(data));
    },
    
    async updateStaff(id, data) {
      return retryOperation(() => supabaseService.updateStaff(id, data));
    },
    
    async deleteStaff(id) {
      return retryOperation(() => supabaseService.deleteStaff(id));
    },
    
    async updatePatient(id, data) {
      return retryOperation(() => supabaseService.updatePatient(id, data));
    },
    
    async updateWard(id, data) {
      return retryOperation(() => supabaseService.updateWard(id, data));
    }
  };
};
