export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  honors?: string;
  relevantCoursework?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  technologiesString?: string; // For form binding
  startDate: string;
  endDate?: string;
  current: boolean;
  url?: string;
  githubUrl?: string;
  achievements: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Conversational' | 'Professional' | 'Native';
}

export interface VolunteerExperience {
  id: string;
  organization: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal?: string;
  publisher?: string;
  publicationDate: string;
  url?: string;
  doi?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface ResumeData {
  id: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  volunteerExperience: VolunteerExperience[];
  publications: Publication[];
  awards: Award[];
  references: Reference[];
  template: 'modern' | 'classic' | 'creative';
  createdAt: string;
  updatedAt: string;
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  preview: string;
}
