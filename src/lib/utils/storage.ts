import type { ResumeData } from '../types.js';

const STORAGE_KEY = 'resume_builder_data';

export class ResumeStorage {
  private static instance: ResumeStorage;
  
  private constructor() {}
  
  public static getInstance(): ResumeStorage {
    if (!ResumeStorage.instance) {
      ResumeStorage.instance = new ResumeStorage();
    }
    return ResumeStorage.instance;
  }
  
  // Save resume data to localStorage
  public saveResume(resumeData: ResumeData): void {
    try {
      const data = JSON.stringify(resumeData);
      localStorage.setItem(`${STORAGE_KEY}_${resumeData.id}`, data);
      
      // Also save to a list of all resumes
      const allResumes = this.getAllResumes();
      const existingIndex = allResumes.findIndex(r => r.id === resumeData.id);
      
      if (existingIndex >= 0) {
        allResumes[existingIndex] = resumeData;
      } else {
        allResumes.push(resumeData);
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allResumes));
    } catch (error) {
      console.error('Error saving resume:', error);
      throw new Error('Failed to save resume data');
    }
  }
  
  // Load resume data from localStorage
  public loadResume(id: string): ResumeData | null {
    try {
      const data = localStorage.getItem(`${STORAGE_KEY}_${id}`);
      if (!data) return null;
      
      return JSON.parse(data) as ResumeData;
    } catch (error) {
      console.error('Error loading resume:', error);
      return null;
    }
  }
  
  // Get all resumes
  public getAllResumes(): ResumeData[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      return JSON.parse(data) as ResumeData[];
    } catch (error) {
      console.error('Error loading all resumes:', error);
      return [];
    }
  }
  
  // Delete resume
  public deleteResume(id: string): void {
    try {
      localStorage.removeItem(`${STORAGE_KEY}_${id}`);
      
      // Remove from list
      const allResumes = this.getAllResumes();
      const filteredResumes = allResumes.filter(r => r.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredResumes));
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw new Error('Failed to delete resume');
    }
  }
  
  // Create a new resume with default data
  public createNewResume(): ResumeData {
    const id = this.generateId();
    const now = new Date().toISOString();
    
    return {
      id,
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        website: '',
        linkedin: '',
        github: '',
        twitter: '',
        summary: ''
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      volunteerExperience: [],
      publications: [],
      awards: [],
      references: [],
      template: 'modern',
      createdAt: now,
      updatedAt: now
    };
  }
  
  // Generate a unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  // Export resume data as JSON
  public exportResume(resumeData: ResumeData): string {
    return JSON.stringify(resumeData, null, 2);
  }
  
  // Import resume data from JSON
  public importResume(jsonData: string): ResumeData {
    try {
      const data = JSON.parse(jsonData);
      
      // Validate the data structure
      if (!data.id || !data.personalInfo) {
        throw new Error('Invalid resume data format');
      }
      
      // Generate new ID to avoid conflicts
      data.id = this.generateId();
      data.createdAt = new Date().toISOString();
      data.updatedAt = new Date().toISOString();
      
      return data as ResumeData;
    } catch (error) {
      console.error('Error importing resume:', error);
      throw new Error('Failed to import resume data');
    }
  }
}

// Export singleton instance
export const resumeStorage = ResumeStorage.getInstance();
