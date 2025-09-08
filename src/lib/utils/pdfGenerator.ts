import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDF(element: HTMLElement, filename: string = 'resume.pdf'): Promise<void> {
  try {
    // Create a clone of the element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Set up the cloned element for PDF generation
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.top = '0';
    clonedElement.style.width = '210mm'; // A4 width
    clonedElement.style.backgroundColor = 'white';
    clonedElement.style.color = 'black';
    
    // Add to document temporarily
    document.body.appendChild(clonedElement);
    
    // Configure html2canvas options
    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794, // A4 width in pixels at 96 DPI
      height: clonedElement.scrollHeight,
      scrollX: 0,
      scrollY: 0,
    });
    
    // Remove the cloned element
    document.body.removeChild(clonedElement);
    
    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Calculate dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;
    
    let imgFinalWidth = pdfWidth;
    let imgFinalHeight = pdfWidth / ratio;
    
    // If image height is greater than PDF height, scale down
    if (imgFinalHeight > pdfHeight) {
      imgFinalHeight = pdfHeight;
      imgFinalWidth = pdfHeight * ratio;
    }
    
    // Center the image
    const x = (pdfWidth - imgFinalWidth) / 2;
    const y = (pdfHeight - imgFinalHeight) / 2;
    
    // Add image to PDF
    pdf.addImage(imgData, 'PNG', x, y, imgFinalWidth, imgFinalHeight);
    
    // Save the PDF
    pdf.save(filename);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

export function downloadResumeAsPDF(element: HTMLElement, name: string): void {
  const filename = `${name.replace(/\s+/g, '_')}_Resume.pdf`;
  generatePDF(element, filename);
}
