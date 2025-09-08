# Resume Builder

A comprehensive resume builder application built with SvelteKit that allows users to create professional resumes with multiple templates, PDF download functionality, and portfolio sharing.

## Features

- **Multiple Templates**: Choose from Modern, Classic, and Creative resume templates
- **Comprehensive Form**: Fill in all possible resume fields including:
  - Personal Information
  - Work Experience
  - Education
  - Skills
  - Projects
  - Certifications
  - Languages
  - Volunteer Experience
  - Publications
  - Awards
  - References
- **PDF Download**: Generate and download high-quality PDF resumes
- **Portfolio Sharing**: Share resumes as online portfolios with unique URLs
- **Data Persistence**: Save and manage multiple resumes locally
- **Real-time Preview**: Preview your resume as you build it
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd abiography
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Create a New Resume**: Click "Create Resume" on the home page
2. **Choose a Template**: Select from Modern, Classic, or Creative templates
3. **Fill in Information**: Use the sidebar navigation to fill in different sections
4. **Preview**: Click "Show Preview" to see how your resume looks
5. **Save**: Click "Save Resume" to store your progress
6. **Download**: Click "Download PDF" to get a PDF version
7. **Share**: Click "Copy Portfolio URL" to share your resume online

## Templates

### Modern Template
- Clean and contemporary design
- Blue color scheme
- Professional layout with icons
- Perfect for tech and creative industries

### Classic Template
- Traditional black and white design
- Serif fonts for formal appearance
- Clean, minimalist layout
- Ideal for corporate and academic positions

### Creative Template
- Colorful and modern design
- Gradients and visual elements
- Dynamic layout with icons
- Great for design and creative roles

## Technical Details

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS
- **PDF Generation**: jsPDF + html2canvas
- **Storage**: LocalStorage for data persistence
- **TypeScript**: Full type safety
- **Responsive**: Mobile-first design

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── ResumeForm.svelte
│   │   └── templates/
│   │       ├── ModernTemplate.svelte
│   │       ├── ClassicTemplate.svelte
│   │       └── CreativeTemplate.svelte
│   ├── utils/
│   │   ├── pdfGenerator.ts
│   │   └── storage.ts
│   └── types.ts
└── routes/
    ├── +page.svelte
    └── portfolio/
        └── [id]/
            └── +page.svelte
```

## Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.