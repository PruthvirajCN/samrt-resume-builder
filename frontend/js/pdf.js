// PDF Export using jsPDF
document.addEventListener('DOMContentLoaded', () => {
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToPDF);
    }
});

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const preview = document.getElementById('resumePreview');
    const content = preview.innerHTML;

    // Create a temporary container to get styled content
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '210mm'; // A4 width
    tempDiv.innerHTML = content;
    document.body.appendChild(tempDiv);

    // Get computed styles and convert to PDF
    const styles = window.getComputedStyle(preview);
    
    // Extract text content and format for PDF
    const textContent = extractTextFromHTML(content);
    
    // Set font
    doc.setFont('helvetica');
    doc.setFontSize(11);
    
    // Split content into pages
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    let yPosition = margin;
    const lineHeight = 7;
    const maxWidth = pageWidth - (margin * 2);

    // Helper function to add text with word wrap
    function addText(text, fontSize = 11, isBold = false, color = [0, 0, 0]) {
        doc.setFontSize(fontSize);
        doc.setTextColor(color[0], color[1], color[2]);
        if (isBold) {
            doc.setFont('helvetica', 'bold');
        } else {
            doc.setFont('helvetica', 'normal');
        }

        const lines = doc.splitTextToSize(text, maxWidth);
        
        lines.forEach(line => {
            if (yPosition > pageHeight - margin - lineHeight) {
                doc.addPage();
                yPosition = margin;
            }
            doc.text(line, margin, yPosition);
            yPosition += lineHeight;
        });
        
        yPosition += 3; // Add spacing after section
    }

    // Parse and add content
    const parser = new DOMParser();
    const docHTML = parser.parseFromString(content, 'text/html');
    
    // Header
    const header = docHTML.querySelector('header') || docHTML.querySelector('h1');
    if (header) {
        const name = header.textContent.trim();
        if (name) {
            addText(name, 18, true, [0, 0, 0]);
            yPosition += 5;
        }
    }

    // Sections
    const sections = docHTML.querySelectorAll('section');
    sections.forEach(section => {
        const heading = section.querySelector('h2');
        if (heading) {
            yPosition += 5;
            addText(heading.textContent.trim(), 14, true, [0, 0, 0]);
            yPosition += 2;
        }

        // Process content
        const paragraphs = section.querySelectorAll('p, div');
        paragraphs.forEach(p => {
            const text = p.textContent.trim();
            if (text && !p.querySelector('h2, h3')) {
                addText(text, 10, false, [0, 0, 0]);
            }
        });

        // Process headings
        const subHeadings = section.querySelectorAll('h3');
        subHeadings.forEach(h3 => {
            yPosition += 3;
            addText(h3.textContent.trim(), 12, true, [0, 0, 0]);
            yPosition += 2;
        });
    });

    // Clean up
    document.body.removeChild(tempDiv);

    // Save PDF
    const fileName = resumeData.personalInfo.fullName 
        ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';
    
    doc.save(fileName);
}

// Helper function to extract text from HTML
function extractTextFromHTML(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}

// Alternative simpler PDF export using html2canvas (if available)
async function exportToPDFAdvanced() {
    try {
        // Try to use html2pdf library if available
        if (typeof html2pdf !== 'undefined') {
            const element = document.getElementById('resumePreview');
            const opt = {
                margin: 1,
                filename: resumeData.personalInfo.fullName 
                    ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
                    : 'Resume.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };
            await html2pdf().set(opt).from(element).save();
        } else {
            // Fallback to basic jsPDF
            exportToPDF();
        }
    } catch (error) {
        console.error('PDF export error:', error);
        alert('Error exporting PDF. Please try again.');
    }
}

