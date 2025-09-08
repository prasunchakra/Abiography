<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { resumeStorage } from '../../../lib/utils/storage.js';
  import { downloadResumeAsPDF } from '../../../lib/utils/pdfGenerator.js';
  import type { ResumeData } from '../../../lib/types.js';
  import ModernTemplate from '../../../lib/components/templates/ModernTemplate.svelte';
  import ClassicTemplate from '../../../lib/components/templates/ClassicTemplate.svelte';
  import CreativeTemplate from '../../../lib/components/templates/CreativeTemplate.svelte';

  let resumeData: ResumeData | null = null;
  let loading = true;
  let error = '';
  let resumeElement: HTMLElement;

  onMount(() => {
    const resumeId = $page.params.id;
    if (resumeId) {
      loadResume(resumeId);
    } else {
      error = 'Resume ID not provided';
      loading = false;
    }
  });

  function loadResume(id: string) {
    try {
      const data = resumeStorage.loadResume(id);
      if (data) {
        resumeData = data;
      } else {
        error = 'Resume not found';
      }
    } catch (err) {
      error = 'Failed to load resume';
      console.error('Error loading resume:', err);
    } finally {
      loading = false;
    }
  }

  function handleDownloadPDF() {
    if (resumeData && resumeElement) {
      const name = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}`;
      downloadResumeAsPDF(resumeElement, name);
    }
  }

  function getTemplateComponent(template: string) {
    switch (template) {
      case 'modern':
        return ModernTemplate;
      case 'classic':
        return ClassicTemplate;
      case 'creative':
        return CreativeTemplate;
      default:
        return ModernTemplate;
    }
  }
</script>

<svelte:head>
  <title>
    {resumeData ? `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} - Resume` : 'Resume Portfolio'}
  </title>
  <meta name="description" content={resumeData?.personalInfo.summary || 'Professional Resume Portfolio'} />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  {#if loading}
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading resume...</p>
      </div>
    </div>
  {:else if error}
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="text-red-600 text-6xl mb-4">⚠️</div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Resume Not Found</h1>
        <p class="text-gray-600 mb-4">{error}</p>
        <a href="/" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Create New Resume
        </a>
      </div>
    </div>
  {:else if resumeData}
    <!-- Header with download button -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
            </h1>
            <p class="text-gray-600">Professional Resume</p>
          </div>
          <div class="flex gap-3">
            <button
              on:click={handleDownloadPDF}
              class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
              Download PDF
            </button>
            <a
              href="/"
              class="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Create Your Resume
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Resume Content -->
    <div class="py-8">
      <div bind:this={resumeElement}>
        {#if resumeData.template === 'modern'}
          <ModernTemplate {resumeData} showDownloadButton={false} />
        {:else if resumeData.template === 'classic'}
          <ClassicTemplate {resumeData} showDownloadButton={false} />
        {:else if resumeData.template === 'creative'}
          <CreativeTemplate {resumeData} showDownloadButton={false} />
        {/if}
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray-300 mb-2">
          This resume was created with Resume Builder
        </p>
        <a href="/" class="text-blue-400 hover:text-blue-300 transition-colors">
          Create your own professional resume →
        </a>
      </div>
    </footer>
  {/if}
</div>
