<script lang="ts">
  import type { ResumeData } from '../../types.js';

  export let resumeData: ResumeData;
  export let showDownloadButton = true;

  function formatDate(dateString: string) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  function formatDateRange(startDate: string, endDate?: string, current = false) {
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate || '');
    return `${start} - ${end}`;
  }
</script>

<div class="resume-container bg-white text-gray-900 max-w-4xl mx-auto p-8 font-sans">
  <!-- Header -->
  <header class="text-center mb-8 border-b-2 border-blue-600 pb-6">
    <h1 class="text-4xl font-bold text-blue-600 mb-2">
      {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
    </h1>
    <div class="flex flex-wrap justify-center gap-4 text-gray-600">
      {#if resumeData.personalInfo.email}
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
          </svg>
          {resumeData.personalInfo.email}
        </span>
      {/if}
      {#if resumeData.personalInfo.phone}
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
          </svg>
          {resumeData.personalInfo.phone}
        </span>
      {/if}
      {#if resumeData.personalInfo.linkedin}
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path>
          </svg>
          LinkedIn
        </span>
      {/if}
      {#if resumeData.personalInfo.github}
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
          </svg>
          GitHub
        </span>
      {/if}
    </div>
    {#if resumeData.personalInfo.address || resumeData.personalInfo.city}
      <p class="text-gray-600 mt-2">
        {resumeData.personalInfo.address}
        {#if resumeData.personalInfo.address && resumeData.personalInfo.city}, {/if}
        {resumeData.personalInfo.city}
        {#if resumeData.personalInfo.state}, {resumeData.personalInfo.state} {/if}
        {#if resumeData.personalInfo.zipCode}{resumeData.personalInfo.zipCode}{/if}
      </p>
    {/if}
  </header>

  <!-- Professional Summary -->
  {#if resumeData.personalInfo.summary}
    <section class="mb-8">
      <h2 class="text-2xl font-bold text-blue-600 mb-4 border-b border-gray-300 pb-2">Professional Summary</h2>
      <p class="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
    </section>
  {/if}

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Main Content -->
    <div class="lg:col-span-2 space-y-8">
      <!-- Experience -->
      {#if resumeData.experience.length > 0}
        <section>
          <h2 class="text-2xl font-bold text-blue-600 mb-4 border-b border-gray-300 pb-2">Professional Experience</h2>
          {#each resumeData.experience as exp}
            <div class="mb-6">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{exp.position}</h3>
                  <p class="text-blue-600 font-medium">{exp.company}</p>
                </div>
                <div class="text-right text-sm text-gray-600">
                  <p>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  {#if exp.location}
                    <p>{exp.location}</p>
                  {/if}
                </div>
              </div>
              {#if exp.description}
                <p class="text-gray-700 mb-2">{exp.description}</p>
              {/if}
              {#if exp.achievements.length > 0}
                <ul class="list-disc list-inside text-gray-700 space-y-1">
                  {#each exp.achievements as achievement}
                    {#if achievement.trim()}
                      <li>{achievement}</li>
                    {/if}
                  {/each}
                </ul>
              {/if}
            </div>
          {/each}
        </section>
      {/if}

      <!-- Education -->
      {#if resumeData.education.length > 0}
        <section>
          <h2 class="text-2xl font-bold text-blue-600 mb-4 border-b border-gray-300 pb-2">Education</h2>
          {#each resumeData.education as edu}
            <div class="mb-4">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                  <p class="text-blue-600 font-medium">{edu.institution}</p>
                  {#if edu.field}
                    <p class="text-gray-600">{edu.field}</p>
                  {/if}
                </div>
                <div class="text-right text-sm text-gray-600">
                  <p>{formatDateRange(edu.startDate, edu.endDate, edu.current)}</p>
                  {#if edu.location}
                    <p>{edu.location}</p>
                  {/if}
                </div>
              </div>
              {#if edu.gpa || edu.honors}
                <div class="text-sm text-gray-600">
                  {#if edu.gpa}<span>GPA: {edu.gpa}</span>{/if}
                  {#if edu.gpa && edu.honors} | {/if}
                  {#if edu.honors}<span>{edu.honors}</span>{/if}
                </div>
              {/if}
            </div>
          {/each}
        </section>
      {/if}

      <!-- Projects -->
      {#if resumeData.projects.length > 0}
        <section>
          <h2 class="text-2xl font-bold text-blue-600 mb-4 border-b border-gray-300 pb-2">Projects</h2>
          {#each resumeData.projects as project}
            <div class="mb-4">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{project.name}</h3>
                  {#if project.url || project.githubUrl}
                    <div class="text-sm">
                      {#if project.url}
                        <a href={project.url} class="text-blue-600 hover:underline mr-3">Live Demo</a>
                      {/if}
                      {#if project.githubUrl}
                        <a href={project.githubUrl} class="text-blue-600 hover:underline">GitHub</a>
                      {/if}
                    </div>
                  {/if}
                </div>
                <div class="text-right text-sm text-gray-600">
                  <p>{formatDateRange(project.startDate, project.endDate, project.current)}</p>
                </div>
              </div>
              {#if project.description}
                <p class="text-gray-700 mb-2">{project.description}</p>
              {/if}
              {#if project.technologies.length > 0}
                <div class="flex flex-wrap gap-2 mb-2">
                  {#each project.technologies as tech}
                    {#if tech.trim()}
                      <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{tech}</span>
                    {/if}
                  {/each}
                </div>
              {/if}
              {#if project.achievements.length > 0}
                <ul class="list-disc list-inside text-gray-700 space-y-1">
                  {#each project.achievements as achievement}
                    {#if achievement.trim()}
                      <li>{achievement}</li>
                    {/if}
                  {/each}
                </ul>
              {/if}
            </div>
          {/each}
        </section>
      {/if}
    </div>

    <!-- Sidebar -->
    <div class="space-y-8">
      <!-- Skills -->
      {#if resumeData.skills.length > 0}
        <section>
          <h2 class="text-xl font-bold text-blue-600 mb-4 border-b border-gray-300 pb-2">Skills</h2>
          <div class="space-y-3">
            {#each resumeData.skills as skill}
              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm font-medium text-gray-900">{skill.name}</span>
                  <span class="text-xs text-gray-600">{skill.level}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full" 
                    style="width: {
                      skill.level === 'Beginner' ? '25%' :
                      skill.level === 'Intermediate' ? '50%' :
                      skill.level === 'Advanced' ? '75%' : '100%'
                    }"
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        </section>
      {/if}

      <!-- Certifications -->
      {#if resumeData.certifications.length > 0}
        <section>
          <h2 class="text-xl font-bold text-blue-600 mb-4 border-b border-gray-300 pb-2">Certifications</h2>
          {#each resumeData.certifications as cert}
            <div class="mb-3">
              <h3 class="text-sm font-semibold text-gray-900">{cert.name}</h3>
              <p class="text-xs text-gray-600">{cert.issuer}</p>
              <p class="text-xs text-gray-500">{formatDate(cert.issueDate)}</p>
            </div>
          {/each}
        </section>
      {/if}

      <!-- Languages -->
      {#if resumeData.languages.length > 0}
        <section>
          <h2 class="text-xl font-bold text-blue-600 mb-4 border-b border-gray-300 pb-2">Languages</h2>
          {#each resumeData.languages as lang}
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-gray-900">{lang.name}</span>
              <span class="text-xs text-gray-600">{lang.proficiency}</span>
            </div>
          {/each}
        </section>
      {/if}

      <!-- Awards -->
      {#if resumeData.awards.length > 0}
        <section>
          <h2 class="text-xl font-bold text-blue-600 mb-4 border-b border-gray-300 pb-2">Awards</h2>
          {#each resumeData.awards as award}
            <div class="mb-3">
              <h3 class="text-sm font-semibold text-gray-900">{award.title}</h3>
              <p class="text-xs text-gray-600">{award.issuer}</p>
              <p class="text-xs text-gray-500">{formatDate(award.date)}</p>
            </div>
          {/each}
        </section>
      {/if}
    </div>
  </div>
</div>

<style>
  .resume-container {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
  }
  
  @media print {
    .resume-container {
      max-width: none;
      margin: 0;
      padding: 20px;
    }
  }
</style>
