<script lang="ts">
  import { onMount } from 'svelte';
  import { resumeStorage } from '../lib/utils/storage.js';
  import ResumeForm from '../lib/components/ResumeForm.svelte';
  import type { ResumeData, TemplateConfig } from '../lib/types.js';

  let currentView: 'home' | 'builder' | 'templates' = 'home';
  let selectedTemplate: string = 'modern';
  let resumeData: ResumeData | null = null;
  let savedResumes: ResumeData[] = [];

  const templates: TemplateConfig[] = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design with blue accents',
      preview: '/api/template-preview/modern'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional black and white professional layout',
      preview: '/api/template-preview/classic'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Colorful and modern with gradients and icons',
      preview: '/api/template-preview/creative'
    }
  ];

  onMount(() => {
    loadSavedResumes();
  });

  function loadSavedResumes() {
    savedResumes = resumeStorage.getAllResumes();
  }

  function startNewResume() {
    resumeData = resumeStorage.createNewResume();
    currentView = 'builder';
  }

  function loadExistingResume(resume: ResumeData) {
    resumeData = resume;
    currentView = 'builder';
  }

  function selectTemplate(templateId: string) {
    selectedTemplate = templateId;
    if (resumeData) {
      resumeData.template = templateId as 'modern' | 'classic' | 'creative';
    }
  }

  function handleSaveResume(data: ResumeData) {
    resumeStorage.saveResume(data);
    resumeData = data;
    loadSavedResumes();
    
    // Show success message
    alert('Resume saved successfully!');
  }

  function deleteResume(id: string) {
    if (confirm('Are you sure you want to delete this resume?')) {
      resumeStorage.deleteResume(id);
      loadSavedResumes();
    }
  }

  function getPortfolioUrl(id: string): string {
    return `${window.location.origin}/portfolio/${id}`;
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    alert('Portfolio URL copied to clipboard!');
  }
</script>

<svelte:head>
  <title>Resume Builder - Create Professional Resumes</title>
  <meta name="description" content="Create professional resumes with our easy-to-use resume builder. Choose from multiple templates and download as PDF." />
</svelte:head>

{#if currentView === 'home'}
  <!-- Home Page -->
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Resume Builder</h1>
          <div class="flex gap-4">
            <button
              on:click={() => currentView = 'templates'}
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Templates
            </button>
            <button
              on:click={startNewResume}
              class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Resume
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          Create Your Professional Resume
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Build a stunning resume in minutes with our easy-to-use resume builder. 
          Choose from professional templates and download as PDF or share as a portfolio.
        </p>
        <div class="flex justify-center gap-4">
          <button
            on:click={startNewResume}
            class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Building
          </button>
          <button
            on:click={() => currentView = 'templates'}
            class="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            View Templates
          </button>
        </div>
      </div>

      <!-- Features -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div class="bg-white rounded-lg p-6 shadow-lg text-center">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Multiple Templates</h3>
          <p class="text-gray-600">Choose from modern, classic, and creative templates designed by professionals.</p>
        </div>
        
        <div class="bg-white rounded-lg p-6 shadow-lg text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">PDF Download</h3>
          <p class="text-gray-600">Download your resume as a high-quality PDF ready for printing or emailing.</p>
        </div>
        
        <div class="bg-white rounded-lg p-6 shadow-lg text-center">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Portfolio Sharing</h3>
          <p class="text-gray-600">Share your resume as a beautiful online portfolio with a unique URL.</p>
        </div>
      </div>

      <!-- Saved Resumes -->
      {#if savedResumes.length > 0}
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Your Saved Resumes</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each savedResumes as resume}
              <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 class="font-semibold text-gray-900 mb-2">
                  {resume.personalInfo.firstName} {resume.personalInfo.lastName}
                </h3>
                <p class="text-sm text-gray-600 mb-3">
                  Template: {resume.template.charAt(0).toUpperCase() + resume.template.slice(1)}
                </p>
                <p class="text-xs text-gray-500 mb-4">
                  Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div class="flex gap-2">
                  <button
                    on:click={() => loadExistingResume(resume)}
                    class="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    on:click={() => copyToClipboard(getPortfolioUrl(resume.id))}
                    class="flex-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    Share
                  </button>
                  <button
                    on:click={() => deleteResume(resume.id)}
                    class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
{:else if currentView === 'templates'}
  <!-- Templates Page -->
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Choose a Template</h1>
          <button
            on:click={() => currentView = 'home'}
            class="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Professional Resume Templates</h2>
        <p class="text-gray-600">Select a template that best represents your professional style</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each templates as template}
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div class="text-center">
                <div class="text-6xl mb-2">
                  {template.id === 'modern' ? '📄' : template.id === 'classic' ? '📋' : '🎨'}
                </div>
                <p class="text-gray-600">Template Preview</p>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{template.name}</h3>
              <p class="text-gray-600 mb-4">{template.description}</p>
              <button
                on:click={() => {
                  selectedTemplate = template.id;
                  startNewResume();
                }}
                class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Use This Template
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{:else if currentView === 'builder' && resumeData}
  <!-- Resume Builder -->
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Resume Builder</h1>
          <div class="flex gap-4">
            <button
              on:click={() => currentView = 'home'}
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Home
            </button>
            <button
              on:click={() => currentView = 'templates'}
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Change Template
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Resume Form -->
    <ResumeForm {resumeData} onSave={handleSaveResume} />
  </div>
{/if}
