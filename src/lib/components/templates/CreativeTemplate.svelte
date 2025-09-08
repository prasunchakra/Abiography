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

<div class="resume-container bg-gradient-to-br from-purple-50 to-blue-50 text-gray-900 max-w-5xl mx-auto p-8 font-sans">
  <!-- Header with Creative Design -->
  <header class="relative mb-8 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 opacity-90"></div>
    <div class="relative z-10 text-center text-white py-12">
      <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
        <div class="w-24 h-24 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
          <span class="text-3xl font-bold text-white">
            {resumeData.personalInfo.firstName.charAt(0)}{resumeData.personalInfo.lastName.charAt(0)}
          </span>
        </div>
      </div>
      <h1 class="text-4xl font-bold mb-2">
        {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
      </h1>
      <div class="flex flex-wrap justify-center gap-6 text-blue-100 mt-4">
        {#if resumeData.personalInfo.email}
          <span class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            {resumeData.personalInfo.email}
          </span>
        {/if}
        {#if resumeData.personalInfo.phone}
          <span class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
            </svg>
            {resumeData.personalInfo.phone}
          </span>
        {/if}
        {#if resumeData.personalInfo.linkedin}
          <span class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path>
            </svg>
            LinkedIn
          </span>
        {/if}
        {#if resumeData.personalInfo.github}
          <span class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
            </svg>
            GitHub
          </span>
        {/if}
      </div>
      {#if resumeData.personalInfo.address || resumeData.personalInfo.city}
        <p class="text-blue-100 mt-3">
          {resumeData.personalInfo.address}
          {#if resumeData.personalInfo.address && resumeData.personalInfo.city}, {/if}
          {resumeData.personalInfo.city}
          {#if resumeData.personalInfo.state}, {resumeData.personalInfo.state} {/if}
          {#if resumeData.personalInfo.zipCode}{resumeData.personalInfo.zipCode}{/if}
        </p>
      {/if}
    </div>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Main Content -->
    <div class="lg:col-span-2 space-y-8">
      <!-- Professional Summary -->
      {#if resumeData.personalInfo.summary}
        <section class="bg-white rounded-xl p-6 shadow-lg">
          <h2 class="text-2xl font-bold text-purple-600 mb-4 flex items-center">
            <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
              </svg>
            </div>
            About Me
          </h2>
          <p class="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </section>
      {/if}

      <!-- Experience -->
      {#if resumeData.experience.length > 0}
        <section class="bg-white rounded-xl p-6 shadow-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6 flex items-center">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
              </svg>
            </div>
            Work Experience
          </h2>
          {#each resumeData.experience as exp}
            <div class="mb-6 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="text-xl font-bold text-gray-900">{exp.position}</h3>
                  <p class="text-lg font-semibold text-blue-600">{exp.company}</p>
                </div>
                <div class="text-right">
                  <div class="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </div>
                  {#if exp.location}
                    <p class="text-sm text-gray-600 mt-1">{exp.location}</p>
                  {/if}
                </div>
              </div>
              {#if exp.description}
                <p class="text-gray-700 mb-3">{exp.description}</p>
              {/if}
              {#if exp.achievements.length > 0}
                <ul class="space-y-2">
                  {#each exp.achievements as achievement}
                    {#if achievement.trim()}
                      <li class="flex items-start">
                        <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span class="text-gray-700">{achievement}</span>
                      </li>
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
        <section class="bg-white rounded-xl p-6 shadow-lg">
          <h2 class="text-2xl font-bold text-indigo-600 mb-6 flex items-center">
            <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
              </svg>
            </div>
            Education
          </h2>
          {#each resumeData.education as edu}
            <div class="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-lg font-bold text-gray-900">{edu.degree}</h3>
                  <p class="text-lg font-semibold text-indigo-600">{edu.institution}</p>
                  {#if edu.field}
                    <p class="text-gray-600">{edu.field}</p>
                  {/if}
                </div>
                <div class="text-right">
                  <div class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </div>
                  {#if edu.location}
                    <p class="text-sm text-gray-600 mt-1">{edu.location}</p>
                  {/if}
                </div>
              </div>
              {#if edu.gpa || edu.honors}
                <div class="text-sm text-gray-600">
                  {#if edu.gpa}<span class="font-semibold">GPA:</span> {edu.gpa}{/if}
                  {#if edu.gpa && edu.honors} | {/if}
                  {#if edu.honors}<span class="font-semibold">Honors:</span> {edu.honors}{/if}
                </div>
              {/if}
            </div>
          {/each}
        </section>
      {/if}

      <!-- Projects -->
      {#if resumeData.projects.length > 0}
        <section class="bg-white rounded-xl p-6 shadow-lg">
          <h2 class="text-2xl font-bold text-green-600 mb-6 flex items-center">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </div>
            Projects
          </h2>
          {#each resumeData.projects as project}
            <div class="mb-6 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="text-lg font-bold text-gray-900">{project.name}</h3>
                  {#if project.url || project.githubUrl}
                    <div class="flex gap-3 mt-1">
                      {#if project.url}
                        <a href={project.url} class="text-blue-600 hover:text-blue-800 text-sm font-medium">Live Demo</a>
                      {/if}
                      {#if project.githubUrl}
                        <a href={project.githubUrl} class="text-gray-600 hover:text-gray-800 text-sm font-medium">GitHub</a>
                      {/if}
                    </div>
                  {/if}
                </div>
                <div class="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {formatDateRange(project.startDate, project.endDate, project.current)}
                </div>
              </div>
              {#if project.description}
                <p class="text-gray-700 mb-3">{project.description}</p>
              {/if}
              {#if project.technologies.length > 0}
                <div class="flex flex-wrap gap-2 mb-3">
                  {#each project.technologies as tech}
                    {#if tech.trim()}
                      <span class="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">{tech}</span>
                    {/if}
                  {/each}
                </div>
              {/if}
              {#if project.achievements.length > 0}
                <ul class="space-y-2">
                  {#each project.achievements as achievement}
                    {#if achievement.trim()}
                      <li class="flex items-start">
                        <div class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span class="text-gray-700">{achievement}</span>
                      </li>
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
    <div class="space-y-6">
      <!-- Skills -->
      {#if resumeData.skills.length > 0}
        <section class="bg-white rounded-xl p-6 shadow-lg">
          <h2 class="text-xl font-bold text-purple-600 mb-4 flex items-center">
            <div class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
              <svg class="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
              </svg>
            </div>
            Skills
          </h2>
          <div class="space-y-4">
            {#each resumeData.skills as skill}
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-semibold text-gray-900">{skill.name}</span>
                  <span class="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{skill.level}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300" 
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
        <section class="bg-white rounded-xl p-6 shadow-lg">
          <h2 class="text-xl font-bold text-yellow-600 mb-4 flex items-center">
            <div class="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
              <svg class="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            Certifications
          </h2>
          {#each resumeData.certifications as cert}
            <div class="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400">
              <h3 class="text-sm font-bold text-gray-900">{cert.name}</h3>
              <p class="text-xs text-gray-700">{cert.issuer}</p>
              <p class="text-xs text-gray-500 mt-1">{formatDate(cert.issueDate)}</p>
            </div>
          {/each}
        </section>
      {/if}

      <!-- Languages -->
      {#if resumeData.languages.length > 0}
        <section class="bg-white rounded-xl p-6 shadow-lg">
          <h2 class="text-xl font-bold text-pink-600 mb-4 flex items-center">
            <div class="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center mr-2">
              <svg class="w-3 h-3 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clip-rule="evenodd"></path>
              </svg>
            </div>
            Languages
          </h2>
          {#each resumeData.languages as lang}
            <div class="flex justify-between items-center mb-3 p-2 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
              <span class="text-sm font-semibold text-gray-900">{lang.name}</span>
              <span class="text-xs text-gray-600 bg-pink-100 px-2 py-1 rounded-full">{lang.proficiency}</span>
            </div>
          {/each}
        </section>
      {/if}

      <!-- Awards -->
      {#if resumeData.awards.length > 0}
        <section class="bg-white rounded-xl p-6 shadow-lg">
          <h2 class="text-xl font-bold text-orange-600 mb-4 flex items-center">
            <div class="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-2">
              <svg class="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 1L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-6zM8 15a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            Awards
          </h2>
          {#each resumeData.awards as award}
            <div class="mb-3 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border-l-4 border-orange-400">
              <h3 class="text-sm font-bold text-gray-900">{award.title}</h3>
              <p class="text-xs text-gray-700">{award.issuer}</p>
              <p class="text-xs text-gray-500 mt-1">{formatDate(award.date)}</p>
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
      background: white !important;
    }
    
    .resume-container * {
      background: white !important;
      color: black !important;
    }
  }
</style>
