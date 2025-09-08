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

<div class="resume-container bg-white text-black max-w-4xl mx-auto p-8 font-serif">
  <!-- Header -->
  <header class="text-center mb-8 border-b border-black pb-4">
    <h1 class="text-3xl font-bold text-black mb-2 tracking-wide">
      {resumeData.personalInfo.firstName.toUpperCase()} {resumeData.personalInfo.lastName.toUpperCase()}
    </h1>
    <div class="text-sm text-gray-700 space-y-1">
      {#if resumeData.personalInfo.email}
        <p>{resumeData.personalInfo.email}</p>
      {/if}
      {#if resumeData.personalInfo.phone}
        <p>{resumeData.personalInfo.phone}</p>
      {/if}
      {#if resumeData.personalInfo.address || resumeData.personalInfo.city}
        <p>
          {resumeData.personalInfo.address}
          {#if resumeData.personalInfo.address && resumeData.personalInfo.city}, {/if}
          {resumeData.personalInfo.city}
          {#if resumeData.personalInfo.state}, {resumeData.personalInfo.state} {/if}
          {#if resumeData.personalInfo.zipCode}{resumeData.personalInfo.zipCode}{/if}
        </p>
      {/if}
      <div class="flex justify-center gap-4 mt-2">
        {#if resumeData.personalInfo.linkedin}
          <span class="text-xs">LinkedIn: {resumeData.personalInfo.linkedin}</span>
        {/if}
        {#if resumeData.personalInfo.github}
          <span class="text-xs">GitHub: {resumeData.personalInfo.github}</span>
        {/if}
        {#if resumeData.personalInfo.website}
          <span class="text-xs">Website: {resumeData.personalInfo.website}</span>
        {/if}
      </div>
    </div>
  </header>

  <!-- Professional Summary -->
  {#if resumeData.personalInfo.summary}
    <section class="mb-6">
      <h2 class="text-lg font-bold text-black mb-3 border-b border-gray-400 pb-1">PROFESSIONAL SUMMARY</h2>
      <p class="text-sm text-gray-800 leading-relaxed">{resumeData.personalInfo.summary}</p>
    </section>
  {/if}

  <!-- Experience -->
  {#if resumeData.experience.length > 0}
    <section class="mb-6">
      <h2 class="text-lg font-bold text-black mb-3 border-b border-gray-400 pb-1">PROFESSIONAL EXPERIENCE</h2>
      {#each resumeData.experience as exp}
        <div class="mb-4">
          <div class="flex justify-between items-start mb-1">
            <div>
              <h3 class="text-base font-bold text-black">{exp.position}</h3>
              <p class="text-sm font-semibold text-gray-800">{exp.company}</p>
            </div>
            <div class="text-right text-xs text-gray-600">
              <p>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
              {#if exp.location}
                <p>{exp.location}</p>
              {/if}
            </div>
          </div>
          {#if exp.description}
            <p class="text-sm text-gray-700 mb-2">{exp.description}</p>
          {/if}
          {#if exp.achievements.length > 0}
            <ul class="text-sm text-gray-700 list-disc list-inside ml-4 space-y-1">
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
    <section class="mb-6">
      <h2 class="text-lg font-bold text-black mb-3 border-b border-gray-400 pb-1">EDUCATION</h2>
      {#each resumeData.education as edu}
        <div class="mb-3">
          <div class="flex justify-between items-start mb-1">
            <div>
              <h3 class="text-base font-bold text-black">{edu.degree}</h3>
              <p class="text-sm font-semibold text-gray-800">{edu.institution}</p>
              {#if edu.field}
                <p class="text-sm text-gray-700">{edu.field}</p>
              {/if}
            </div>
            <div class="text-right text-xs text-gray-600">
              <p>{formatDateRange(edu.startDate, edu.endDate, edu.current)}</p>
              {#if edu.location}
                <p>{edu.location}</p>
              {/if}
            </div>
          </div>
          {#if edu.gpa || edu.honors}
            <div class="text-sm text-gray-700">
              {#if edu.gpa}<span>GPA: {edu.gpa}</span>{/if}
              {#if edu.gpa && edu.honors} | {/if}
              {#if edu.honors}<span>{edu.honors}</span>{/if}
            </div>
          {/if}
        </div>
      {/each}
    </section>
  {/if}

  <!-- Skills -->
  {#if resumeData.skills.length > 0}
    <section class="mb-6">
      <h2 class="text-lg font-bold text-black mb-3 border-b border-gray-400 pb-1">TECHNICAL SKILLS</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each resumeData.skills as skill}
          <div class="text-sm">
            <span class="font-semibold text-gray-900">{skill.name}:</span>
            <span class="text-gray-700 ml-1">{skill.level}</span>
          </div>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Projects -->
  {#if resumeData.projects.length > 0}
    <section class="mb-6">
      <h2 class="text-lg font-bold text-black mb-3 border-b border-gray-400 pb-1">PROJECTS</h2>
      {#each resumeData.projects as project}
        <div class="mb-3">
          <div class="flex justify-between items-start mb-1">
            <div>
              <h3 class="text-base font-bold text-black">{project.name}</h3>
              {#if project.url || project.githubUrl}
                <div class="text-xs text-gray-600">
                  {#if project.url}
                    <span>Live Demo: {project.url}</span>
                  {/if}
                  {#if project.url && project.githubUrl} | {/if}
                  {#if project.githubUrl}
                    <span>GitHub: {project.githubUrl}</span>
                  {/if}
                </div>
              {/if}
            </div>
            <div class="text-right text-xs text-gray-600">
              <p>{formatDateRange(project.startDate, project.endDate, project.current)}</p>
            </div>
          </div>
          {#if project.description}
            <p class="text-sm text-gray-700 mb-1">{project.description}</p>
          {/if}
          {#if project.technologies.length > 0}
            <p class="text-xs text-gray-600">
              <span class="font-semibold">Technologies:</span> {project.technologies.join(', ')}
            </p>
          {/if}
          {#if project.achievements.length > 0}
            <ul class="text-sm text-gray-700 list-disc list-inside ml-4 space-y-1">
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

  <!-- Certifications -->
  {#if resumeData.certifications.length > 0}
    <section class="mb-6">
      <h2 class="text-lg font-bold text-black mb-3 border-b border-gray-400 pb-1">CERTIFICATIONS</h2>
      {#each resumeData.certifications as cert}
        <div class="mb-2">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-sm font-bold text-black">{cert.name}</h3>
              <p class="text-xs text-gray-700">{cert.issuer}</p>
            </div>
            <div class="text-right text-xs text-gray-600">
              <p>{formatDate(cert.issueDate)}</p>
            </div>
          </div>
        </div>
      {/each}
    </section>
  {/if}

  <!-- Languages -->
  {#if resumeData.languages.length > 0}
    <section class="mb-6">
      <h2 class="text-lg font-bold text-black mb-3 border-b border-gray-400 pb-1">LANGUAGES</h2>
      <div class="text-sm text-gray-700">
        {#each resumeData.languages as lang, index}
          <span class="font-semibold">{lang.name}:</span> {lang.proficiency}
          {#if index < resumeData.languages.length - 1} | {/if}
        {/each}
      </div>
    </section>
  {/if}

  <!-- Awards -->
  {#if resumeData.awards.length > 0}
    <section class="mb-6">
      <h2 class="text-lg font-bold text-black mb-3 border-b border-gray-400 pb-1">AWARDS & HONORS</h2>
      {#each resumeData.awards as award}
        <div class="mb-2">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-sm font-bold text-black">{award.title}</h3>
              <p class="text-xs text-gray-700">{award.issuer}</p>
            </div>
            <div class="text-right text-xs text-gray-600">
              <p>{formatDate(award.date)}</p>
            </div>
          </div>
        </div>
      {/each}
    </section>
  {/if}

  <!-- References -->
  {#if resumeData.references.length > 0}
    <section class="mb-6">
      <h2 class="text-lg font-bold text-black mb-3 border-b border-gray-400 pb-1">REFERENCES</h2>
      <div class="text-xs text-gray-700">
        <p>Available upon request</p>
      </div>
    </section>
  {/if}
</div>

<style>
  .resume-container {
    font-family: 'Times New Roman', serif;
    line-height: 1.4;
  }
  
  @media print {
    .resume-container {
      max-width: none;
      margin: 0;
      padding: 20px;
    }
  }
</style>
