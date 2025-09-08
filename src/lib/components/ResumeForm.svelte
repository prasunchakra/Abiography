<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { downloadResumeAsPDF } from '../utils/pdfGenerator.js';
  import ModernTemplate from './templates/ModernTemplate.svelte';
  import ClassicTemplate from './templates/ClassicTemplate.svelte';
  import CreativeTemplate from './templates/CreativeTemplate.svelte';
  import type { ResumeData, PersonalInfo, Experience, Education, Skill, Project, Certification, Language, VolunteerExperience, Publication, Award, Reference } from '../types.js';

  export let resumeData: ResumeData;
  export let onSave: (data: ResumeData) => void;

  let currentSection = 'personal';
  let showPreview = false;
  let previewElement: HTMLElement;

  // Reactive statement to sync technologiesString with technologies array
  $: if (resumeData) {
    resumeData.projects.forEach(project => {
      if (!project.technologiesString) {
        project.technologiesString = project.technologies.join(', ');
      }
    });
  }

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'certifications', label: 'Certifications', icon: '🏆' },
    { id: 'languages', label: 'Languages', icon: '🌍' },
    { id: 'volunteer', label: 'Volunteer', icon: '🤝' },
    { id: 'publications', label: 'Publications', icon: '📚' },
    { id: 'awards', label: 'Awards', icon: '⭐' },
    { id: 'references', label: 'References', icon: '📞' }
  ];

  function addExperience() {
    const newExp: Experience = {
      id: uuidv4(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    resumeData.experience = [...resumeData.experience, newExp];
  }

  function removeExperience(id: string) {
    resumeData.experience = resumeData.experience.filter(exp => exp.id !== id);
  }

  function addAchievement(expId: string) {
    const exp = resumeData.experience.find(e => e.id === expId);
    if (exp) {
      exp.achievements = [...exp.achievements, ''];
    }
  }

  function removeAchievement(expId: string, index: number) {
    const exp = resumeData.experience.find(e => e.id === expId);
    if (exp && exp.achievements.length > 1) {
      exp.achievements = exp.achievements.filter((_, i) => i !== index);
    }
  }

  function addEducation() {
    const newEdu: Education = {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      honors: '',
      relevantCoursework: ['']
    };
    resumeData.education = [...resumeData.education, newEdu];
  }

  function removeEducation(id: string) {
    resumeData.education = resumeData.education.filter(edu => edu.id !== id);
  }

  function addSkill() {
    const newSkill: Skill = {
      id: uuidv4(),
      name: '',
      level: 'Intermediate',
      category: ''
    };
    resumeData.skills = [...resumeData.skills, newSkill];
  }

  function removeSkill(id: string) {
    resumeData.skills = resumeData.skills.filter(skill => skill.id !== id);
  }

  function addProject() {
    const newProject: Project = {
      id: uuidv4(),
      name: '',
      description: '',
      technologies: [''],
      technologiesString: '',
      startDate: '',
      endDate: '',
      current: false,
      url: '',
      githubUrl: '',
      achievements: ['']
    };
    resumeData.projects = [...resumeData.projects, newProject];
  }

  function removeProject(id: string) {
    resumeData.projects = resumeData.projects.filter(project => project.id !== id);
  }

  function addCertification() {
    const newCert: Certification = {
      id: uuidv4(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      url: ''
    };
    resumeData.certifications = [...resumeData.certifications, newCert];
  }

  function removeCertification(id: string) {
    resumeData.certifications = resumeData.certifications.filter(cert => cert.id !== id);
  }

  function addLanguage() {
    const newLang: Language = {
      id: uuidv4(),
      name: '',
      proficiency: 'Conversational'
    };
    resumeData.languages = [...resumeData.languages, newLang];
  }

  function removeLanguage(id: string) {
    resumeData.languages = resumeData.languages.filter(lang => lang.id !== id);
  }

  function addVolunteer() {
    const newVol: VolunteerExperience = {
      id: uuidv4(),
      organization: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    resumeData.volunteerExperience = [...resumeData.volunteerExperience, newVol];
  }

  function removeVolunteer(id: string) {
    resumeData.volunteerExperience = resumeData.volunteerExperience.filter(vol => vol.id !== id);
  }

  function addPublication() {
    const newPub: Publication = {
      id: uuidv4(),
      title: '',
      authors: '',
      journal: '',
      publisher: '',
      publicationDate: '',
      url: '',
      doi: ''
    };
    resumeData.publications = [...resumeData.publications, newPub];
  }

  function removePublication(id: string) {
    resumeData.publications = resumeData.publications.filter(pub => pub.id !== id);
  }

  function addAward() {
    const newAward: Award = {
      id: uuidv4(),
      title: '',
      issuer: '',
      date: '',
      description: ''
    };
    resumeData.awards = [...resumeData.awards, newAward];
  }

  function removeAward(id: string) {
    resumeData.awards = resumeData.awards.filter(award => award.id !== id);
  }

  function addReference() {
    const newRef: Reference = {
      id: uuidv4(),
      name: '',
      position: '',
      company: '',
      email: '',
      phone: '',
      relationship: ''
    };
    resumeData.references = [...resumeData.references, newRef];
  }

  function removeReference(id: string) {
    resumeData.references = resumeData.references.filter(ref => ref.id !== id);
  }

  function handleSave() {
    resumeData.updatedAt = new Date().toISOString();
    onSave(resumeData);
  }

  function handleDownloadPDF() {
    if (previewElement) {
      const name = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}`;
      downloadResumeAsPDF(previewElement, name);
    }
  }

  function getPortfolioUrl(): string {
    return `${window.location.origin}/portfolio/${resumeData.id}`;
  }

  function copyPortfolioUrl() {
    navigator.clipboard.writeText(getPortfolioUrl());
    alert('Portfolio URL copied to clipboard!');
  }
</script>

<div class="min-h-screen bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h1 class="text-2xl font-bold text-white">Resume Builder</h1>
        <p class="text-blue-100 mt-1">Create your professional resume</p>
      </div>

      <div class="flex">
        <!-- Sidebar -->
        <div class="w-64 bg-gray-100 border-r">
          <nav class="p-4">
            <ul class="space-y-2">
              {#each sections as section}
                <li>
                  <button
                    class="w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors
                      {currentSection === section.id 
                        ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' 
                        : 'text-gray-600 hover:bg-gray-200'}"
                    on:click={() => currentSection = section.id}
                  >
                    <span class="mr-2">{section.icon}</span>
                    {section.label}
                  </button>
                </li>
              {/each}
            </ul>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1 p-6">
          {#if currentSection === 'personal'}
            <div class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-900">Personal Information</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    bind:value={resumeData.personalInfo.firstName}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    bind:value={resumeData.personalInfo.lastName}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    bind:value={resumeData.personalInfo.email}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    bind:value={resumeData.personalInfo.phone}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    bind:value={resumeData.personalInfo.address}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    bind:value={resumeData.personalInfo.city}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    bind:value={resumeData.personalInfo.state}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    bind:value={resumeData.personalInfo.zipCode}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    bind:value={resumeData.personalInfo.country}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    bind:value={resumeData.personalInfo.website}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    bind:value={resumeData.personalInfo.linkedin}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                  <input
                    type="url"
                    bind:value={resumeData.personalInfo.github}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                  <input
                    type="url"
                    bind:value={resumeData.personalInfo.twitter}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Professional Summary *</label>
                <textarea
                  bind:value={resumeData.personalInfo.summary}
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write a brief summary of your professional background and key strengths..."
                  required
                ></textarea>
              </div>
            </div>
          {/if}

          {#if currentSection === 'experience'}
            <div class="space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-gray-900">Work Experience</h2>
                <button
                  on:click={addExperience}
                  class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Experience
                </button>
              </div>

              {#each resumeData.experience as exp, index}
                <div class="border border-gray-200 rounded-lg p-6">
                  <div class="flex justify-between items-start mb-4">
                    <h3 class="text-lg font-medium text-gray-900">Experience #{index + 1}</h3>
                    <button
                      on:click={() => removeExperience(exp.id)}
                      class="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                      <input
                        type="text"
                        bind:value={exp.company}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                      <input
                        type="text"
                        bind:value={exp.position}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        bind:value={exp.location}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                      <input
                        type="month"
                        bind:value={exp.startDate}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="month"
                        bind:value={exp.endDate}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={exp.current}
                      />
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        bind:checked={exp.current}
                        class="mr-2"
                      />
                      <label class="text-sm font-medium text-gray-700">Currently working here</label>
                    </div>
                  </div>
                  
                  <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      bind:value={exp.description}
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  
                  <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Key Achievements</label>
                    {#each exp.achievements as achievement, achIndex}
                      <div class="flex gap-2 mb-2">
                        <input
                          type="text"
                          bind:value={exp.achievements[achIndex]}
                          class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Describe a key achievement..."
                        />
                        {#if exp.achievements.length > 1}
                          <button
                            on:click={() => removeAchievement(exp.id, achIndex)}
                            class="text-red-600 hover:text-red-800 px-2"
                          >
                            ×
                          </button>
                        {/if}
                      </div>
                    {/each}
                    <button
                      on:click={() => addAchievement(exp.id)}
                      class="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Achievement
                    </button>
                  </div>
                </div>
              {/each}
            </div>
          {/if}

          {#if currentSection === 'education'}
            <div class="space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-gray-900">Education</h2>
                <button
                  on:click={addEducation}
                  class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Education
                </button>
              </div>

              {#each resumeData.education as edu, index}
                <div class="border border-gray-200 rounded-lg p-6">
                  <div class="flex justify-between items-start mb-4">
                    <h3 class="text-lg font-medium text-gray-900">Education #{index + 1}</h3>
                    <button
                      on:click={() => removeEducation(edu.id)}
                      class="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Institution *</label>
                      <input
                        type="text"
                        bind:value={edu.institution}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
                      <input
                        type="text"
                        bind:value={edu.degree}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                      <input
                        type="text"
                        bind:value={edu.field}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        bind:value={edu.location}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                      <input
                        type="month"
                        bind:value={edu.startDate}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="month"
                        bind:value={edu.endDate}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={edu.current}
                      />
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        bind:checked={edu.current}
                        class="mr-2"
                      />
                      <label class="text-sm font-medium text-gray-700">Currently studying</label>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                      <input
                        type="text"
                        bind:value={edu.gpa}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Honors</label>
                      <input
                        type="text"
                        bind:value={edu.honors}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {/if}

          {#if currentSection === 'skills'}
            <div class="space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-gray-900">Skills</h2>
                <button
                  on:click={addSkill}
                  class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Skill
                </button>
              </div>

              {#each resumeData.skills as skill, index}
                <div class="border border-gray-200 rounded-lg p-6">
                  <div class="flex justify-between items-start mb-4">
                    <h3 class="text-lg font-medium text-gray-900">Skill #{index + 1}</h3>
                    <button
                      on:click={() => removeSkill(skill.id)}
                      class="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Skill Name *</label>
                      <input
                        type="text"
                        bind:value={skill.name}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input
                        type="text"
                        bind:value={skill.category}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Technical, Soft Skills, Languages"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Level *</label>
                      <select
                        bind:value={skill.level}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {/if}

          <!-- Add similar sections for other categories -->
          <!-- For brevity, I'll add a few more key sections -->

          {#if currentSection === 'projects'}
            <div class="space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-gray-900">Projects</h2>
                <button
                  on:click={addProject}
                  class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Project
                </button>
              </div>

              {#each resumeData.projects as project, index}
                <div class="border border-gray-200 rounded-lg p-6">
                  <div class="flex justify-between items-start mb-4">
                    <h3 class="text-lg font-medium text-gray-900">Project #{index + 1}</h3>
                    <button
                      on:click={() => removeProject(project.id)}
                      class="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                      <input
                        type="text"
                        bind:value={project.name}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                      <input
                        type="month"
                        bind:value={project.startDate}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="month"
                        bind:value={project.endDate}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={project.current}
                      />
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        bind:checked={project.current}
                        class="mr-2"
                      />
                      <label class="text-sm font-medium text-gray-700">Currently working on</label>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
                      <input
                        type="url"
                        bind:value={project.url}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                      <input
                        type="url"
                        bind:value={project.githubUrl}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      bind:value={project.description}
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  
                  <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
                    <input
                      type="text"
                      bind:value={project.technologiesString}
                      on:input={(e) => {
                        project.technologies = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
                      }}
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="React, Node.js, MongoDB, etc."
                    />
                  </div>
                </div>
              {/each}
            </div>
          {/if}

          <!-- Action Buttons -->
          <div class="mt-8 flex justify-between">
            <button
              on:click={() => showPreview = !showPreview}
              class="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <div class="flex gap-3">
              <button
                on:click={copyPortfolioUrl}
                class="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Copy Portfolio URL
              </button>
              <button
                on:click={handleDownloadPDF}
                class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                disabled={!showPreview}
              >
                Download PDF
              </button>
              <button
                on:click={handleSave}
                class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Save Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Preview Section -->
  {#if showPreview}
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto">
        <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h3 class="text-xl font-semibold">Resume Preview</h3>
          <div class="flex gap-3">
            <button
              on:click={handleDownloadPDF}
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Download PDF
            </button>
            <button
              on:click={() => showPreview = false}
              class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
        <div class="p-6" bind:this={previewElement}>
          {#if resumeData.template === 'modern'}
            <ModernTemplate {resumeData} showDownloadButton={false} />
          {:else if resumeData.template === 'classic'}
            <ClassicTemplate {resumeData} showDownloadButton={false} />
          {:else if resumeData.template === 'creative'}
            <CreativeTemplate {resumeData} showDownloadButton={false} />
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>
