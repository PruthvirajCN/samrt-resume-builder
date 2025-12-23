// Resume Templates - ATS-friendly designs
function renderTemplate(templateName, data) {
    switch (templateName) {
        case 'minimal':
            return renderMinimalTemplate(data);
        case 'modern':
            return renderModernTemplate(data);
        case 'corporate':
            return renderCorporateTemplate(data);
        case 'creative':
            return renderCreativeTemplate(data);
        default:
            return renderMinimalTemplate(data);
    }
}

// Minimal Template - Clean and ATS-friendly
function renderMinimalTemplate(data) {
    const { personalInfo, summary, skills, experience, education, projects, certifications } = data;
    
    return `
        <div style="font-family: 'Arial', 'Helvetica', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #333; line-height: 1.6;">
            <!-- Header -->
            <header style="border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="font-size: 32px; font-weight: bold; margin: 0; color: #1e40af;">${personalInfo.fullName || 'Your Name'}</h1>
                <div style="margin-top: 10px; color: #4b5563;">
                    ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
                    ${personalInfo.phone ? `<span> | ${personalInfo.phone}</span>` : ''}
                    ${personalInfo.location ? `<span> | ${personalInfo.location}</span>` : ''}
                    ${personalInfo.linkedin ? `<span> | <a href="${personalInfo.linkedin}" style="color: #2563eb;">LinkedIn</a></span>` : ''}
                </div>
            </header>

            <!-- Summary -->
            ${summary ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 20px; font-weight: bold; color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px;">PROFESSIONAL SUMMARY</h2>
                <p style="text-align: justify; color: #374151;">${summary}</p>
            </section>
            ` : ''}

            <!-- Skills -->
            ${skills && skills.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 20px; font-weight: bold; color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px;">SKILLS</h2>
                <p style="color: #374151;">${skills.join(' • ')}</p>
            </section>
            ` : ''}

            <!-- Experience -->
            ${experience && experience.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 20px; font-weight: bold; color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px;">PROFESSIONAL EXPERIENCE</h2>
                ${experience.map(exp => `
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 5px;">
                            <div>
                                <h3 style="font-size: 18px; font-weight: bold; color: #111827; margin: 0;">${exp.title || 'Job Title'}</h3>
                                <p style="font-size: 16px; color: #4b5563; margin: 2px 0;">${exp.company || 'Company'}</p>
                            </div>
                            <div style="text-align: right; color: #6b7280; font-size: 14px;">
                                ${exp.startDate || ''} ${exp.endDate ? `- ${exp.endDate}` : ''}
                            </div>
                        </div>
                        ${exp.description ? `<p style="color: #374151; margin-top: 8px;">${exp.description.replace(/\n/g, '<br>')}</p>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Education -->
            ${education && education.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 20px; font-weight: bold; color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px;">EDUCATION</h2>
                ${education.map(edu => `
                    <div style="margin-bottom: 15px;">
                        <h3 style="font-size: 16px; font-weight: bold; color: #111827; margin: 0;">${edu.degree || 'Degree'}</h3>
                        <p style="color: #4b5563; margin: 2px 0;">${edu.school || 'School'}${edu.graduationDate ? ` • ${edu.graduationDate}` : ''}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Projects -->
            ${projects && projects.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 20px; font-weight: bold; color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px;">PROJECTS</h2>
                ${projects.map(proj => `
                    <div style="margin-bottom: 15px;">
                        <h3 style="font-size: 16px; font-weight: bold; color: #111827; margin: 0;">${proj.name || 'Project Name'}</h3>
                        ${proj.description ? `<p style="color: #374151; margin: 5px 0;">${proj.description.replace(/\n/g, '<br>')}</p>` : ''}
                        ${proj.technologies ? `<p style="color: #6b7280; font-size: 14px; margin: 2px 0;">Technologies: ${proj.technologies}</p>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Certifications -->
            ${certifications && certifications.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 20px; font-weight: bold; color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px;">CERTIFICATIONS</h2>
                ${certifications.map(cert => `
                    <div style="margin-bottom: 10px;">
                        <p style="color: #111827; margin: 0;"><strong>${cert.name || 'Certification'}</strong> - ${cert.issuer || 'Issuer'}${cert.date ? ` (${cert.date})` : ''}</p>
                    </div>
                `).join('')}
            </section>
            ` : ''}
        </div>
    `;
}

// Modern Template
function renderModernTemplate(data) {
    const { personalInfo, summary, skills, experience, education, projects, certifications } = data;
    
    return `
        <div style="font-family: 'Arial', 'Helvetica', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1f2937; line-height: 1.7;">
            <!-- Header -->
            <header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
                <h1 style="font-size: 36px; font-weight: bold; margin: 0;">${personalInfo.fullName || 'Your Name'}</h1>
                <div style="margin-top: 15px; font-size: 14px; opacity: 0.95;">
                    ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
                    ${personalInfo.phone ? `<span> | ${personalInfo.phone}</span>` : ''}
                    ${personalInfo.location ? `<span> | ${personalInfo.location}</span>` : ''}
                    ${personalInfo.linkedin ? `<span> | <a href="${personalInfo.linkedin}" style="color: white; text-decoration: underline;">LinkedIn</a></span>` : ''}
                </div>
            </header>

            <!-- Summary -->
            ${summary ? `
            <section style="margin-bottom: 25px; padding: 20px; background: #f9fafb; border-left: 4px solid #667eea; border-radius: 4px;">
                <h2 style="font-size: 22px; font-weight: bold; color: #667eea; margin-bottom: 10px;">PROFESSIONAL SUMMARY</h2>
                <p style="text-align: justify; color: #374151;">${summary}</p>
            </section>
            ` : ''}

            <!-- Skills -->
            ${skills && skills.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 22px; font-weight: bold; color: #667eea; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb;">CORE SKILLS</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${skills.map(skill => `<span style="background: #667eea; color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px;">${skill}</span>`).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Experience -->
            ${experience && experience.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 22px; font-weight: bold; color: #667eea; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb;">WORK EXPERIENCE</h2>
                ${experience.map(exp => `
                    <div style="margin-bottom: 25px; padding-left: 20px; border-left: 3px solid #667eea;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                            <div>
                                <h3 style="font-size: 18px; font-weight: bold; color: #111827; margin: 0;">${exp.title || 'Job Title'}</h3>
                                <p style="font-size: 16px; color: #667eea; margin: 3px 0; font-weight: 600;">${exp.company || 'Company'}</p>
                            </div>
                            <span style="color: #6b7280; font-size: 14px; white-space: nowrap;">${exp.startDate || ''} ${exp.endDate ? `- ${exp.endDate}` : ''}</span>
                        </div>
                        ${exp.description ? `<p style="color: #374151; margin-top: 8px; line-height: 1.6;">${exp.description.replace(/\n/g, '<br>')}</p>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Education -->
            ${education && education.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 22px; font-weight: bold; color: #667eea; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb;">EDUCATION</h2>
                ${education.map(edu => `
                    <div style="margin-bottom: 15px; padding-left: 20px; border-left: 3px solid #667eea;">
                        <h3 style="font-size: 16px; font-weight: bold; color: #111827; margin: 0;">${edu.degree || 'Degree'}</h3>
                        <p style="color: #4b5563; margin: 3px 0;">${edu.school || 'School'}${edu.graduationDate ? ` • ${edu.graduationDate}` : ''}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Projects -->
            ${projects && projects.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 22px; font-weight: bold; color: #667eea; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb;">PROJECTS</h2>
                ${projects.map(proj => `
                    <div style="margin-bottom: 20px; padding: 15px; background: #f9fafb; border-radius: 6px;">
                        <h3 style="font-size: 17px; font-weight: bold; color: #111827; margin: 0 0 8px 0;">${proj.name || 'Project Name'}</h3>
                        ${proj.description ? `<p style="color: #374151; margin: 5px 0; line-height: 1.6;">${proj.description.replace(/\n/g, '<br>')}</p>` : ''}
                        ${proj.technologies ? `<p style="color: #6b7280; font-size: 14px; margin: 8px 0 0 0;">Technologies: ${proj.technologies}</p>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Certifications -->
            ${certifications && certifications.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 22px; font-weight: bold; color: #667eea; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb;">CERTIFICATIONS</h2>
                ${certifications.map(cert => `
                    <div style="margin-bottom: 10px;">
                        <p style="color: #111827; margin: 0;"><strong>${cert.name || 'Certification'}</strong> - ${cert.issuer || 'Issuer'}${cert.date ? ` (${cert.date})` : ''}</p>
                    </div>
                `).join('')}
            </section>
            ` : ''}
        </div>
    `;
}

// Corporate Template
function renderCorporateTemplate(data) {
    const { personalInfo, summary, skills, experience, education, projects, certifications } = data;
    
    return `
        <div style="font-family: 'Arial', 'Helvetica', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #111827; line-height: 1.6;">
            <!-- Header -->
            <header style="text-align: center; border-bottom: 4px double #1f2937; padding-bottom: 25px; margin-bottom: 30px;">
                <h1 style="font-size: 34px; font-weight: 700; margin: 0; color: #111827; letter-spacing: 1px;">${personalInfo.fullName || 'Your Name'}</h1>
                <div style="margin-top: 12px; color: #4b5563; font-size: 14px;">
                    ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
                    ${personalInfo.phone ? `<span> | ${personalInfo.phone}</span>` : ''}
                    ${personalInfo.location ? `<span> | ${personalInfo.location}</span>` : ''}
                    ${personalInfo.linkedin ? `<span> | <a href="${personalInfo.linkedin}" style="color: #1f2937; text-decoration: none; border-bottom: 1px solid;">LinkedIn</a></span>` : ''}
                </div>
            </header>

            <!-- Summary -->
            ${summary ? `
            <section style="margin-bottom: 28px;">
                <h2 style="font-size: 18px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; border-bottom: 1px solid #d1d5db; padding-bottom: 5px;">PROFESSIONAL SUMMARY</h2>
                <p style="text-align: justify; color: #374151; font-size: 14px;">${summary}</p>
            </section>
            ` : ''}

            <!-- Skills -->
            ${skills && skills.length > 0 ? `
            <section style="margin-bottom: 28px;">
                <h2 style="font-size: 18px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; border-bottom: 1px solid #d1d5db; padding-bottom: 5px;">TECHNICAL SKILLS</h2>
                <p style="color: #374151; font-size: 14px;">${skills.join(' | ')}</p>
            </section>
            ` : ''}

            <!-- Experience -->
            ${experience && experience.length > 0 ? `
            <section style="margin-bottom: 28px;">
                <h2 style="font-size: 18px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; border-bottom: 1px solid #d1d5db; padding-bottom: 5px;">PROFESSIONAL EXPERIENCE</h2>
                ${experience.map(exp => `
                    <div style="margin-bottom: 22px;">
                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                            <div>
                                <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0;">${exp.title || 'Job Title'}</h3>
                                <p style="font-size: 14px; color: #4b5563; margin: 2px 0; font-style: italic;">${exp.company || 'Company'}</p>
                            </div>
                            <span style="color: #6b7280; font-size: 13px; font-weight: 600;">${exp.startDate || ''} ${exp.endDate ? `- ${exp.endDate}` : ''}</span>
                        </div>
                        ${exp.description ? `<p style="color: #374151; margin-top: 8px; font-size: 14px; line-height: 1.7;">${exp.description.replace(/\n/g, '<br>')}</p>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Education -->
            ${education && education.length > 0 ? `
            <section style="margin-bottom: 28px;">
                <h2 style="font-size: 18px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; border-bottom: 1px solid #d1d5db; padding-bottom: 5px;">EDUCATION</h2>
                ${education.map(edu => `
                    <div style="margin-bottom: 15px;">
                        <h3 style="font-size: 15px; font-weight: 700; color: #111827; margin: 0;">${edu.degree || 'Degree'}</h3>
                        <p style="color: #4b5563; margin: 3px 0; font-size: 14px;">${edu.school || 'School'}${edu.graduationDate ? ` • ${edu.graduationDate}` : ''}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Projects -->
            ${projects && projects.length > 0 ? `
            <section style="margin-bottom: 28px;">
                <h2 style="font-size: 18px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; border-bottom: 1px solid #d1d5db; padding-bottom: 5px;">KEY PROJECTS</h2>
                ${projects.map(proj => `
                    <div style="margin-bottom: 18px;">
                        <h3 style="font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 5px 0;">${proj.name || 'Project Name'}</h3>
                        ${proj.description ? `<p style="color: #374151; margin: 5px 0; font-size: 14px; line-height: 1.7;">${proj.description.replace(/\n/g, '<br>')}</p>` : ''}
                        ${proj.technologies ? `<p style="color: #6b7280; font-size: 13px; margin: 5px 0;">Technologies: ${proj.technologies}</p>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Certifications -->
            ${certifications && certifications.length > 0 ? `
            <section style="margin-bottom: 28px;">
                <h2 style="font-size: 18px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; border-bottom: 1px solid #d1d5db; padding-bottom: 5px;">CERTIFICATIONS</h2>
                ${certifications.map(cert => `
                    <div style="margin-bottom: 10px;">
                        <p style="color: #111827; margin: 0; font-size: 14px;"><strong>${cert.name || 'Certification'}</strong> - ${cert.issuer || 'Issuer'}${cert.date ? ` (${cert.date})` : ''}</p>
                    </div>
                `).join('')}
            </section>
            ` : ''}
        </div>
    `;
}

// Clean Creative Template (ATS-safe)
function renderCreativeTemplate(data) {
    const { personalInfo, summary, skills, experience, education, projects, certifications } = data;
    
    return `
        <div style="font-family: 'Arial', 'Helvetica', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1a202c; line-height: 1.7;">
            <!-- Header -->
            <header style="background: #2d3748; color: white; padding: 25px 30px; border-radius: 6px; margin-bottom: 30px;">
                <h1 style="font-size: 32px; font-weight: 600; margin: 0; color: white;">${personalInfo.fullName || 'Your Name'}</h1>
                <div style="margin-top: 12px; font-size: 13px; color: #cbd5e0;">
                    ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
                    ${personalInfo.phone ? `<span> • ${personalInfo.phone}</span>` : ''}
                    ${personalInfo.location ? `<span> • ${personalInfo.location}</span>` : ''}
                    ${personalInfo.linkedin ? `<span> • <a href="${personalInfo.linkedin}" style="color: #90cdf4; text-decoration: none;">LinkedIn</a></span>` : ''}
                </div>
            </header>

            <!-- Summary -->
            ${summary ? `
            <section style="margin-bottom: 25px; padding: 18px; background: #edf2f7; border-radius: 6px; border-left: 5px solid #2d3748;">
                <h2 style="font-size: 20px; font-weight: 600; color: #2d3748; margin-bottom: 10px;">PROFESSIONAL SUMMARY</h2>
                <p style="text-align: justify; color: #2d3748; font-size: 14px;">${summary}</p>
            </section>
            ` : ''}

            <!-- Skills -->
            ${skills && skills.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 20px; font-weight: 600; color: #2d3748; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0;">SKILLS & EXPERTISE</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${skills.map(skill => `<span style="background: #2d3748; color: white; padding: 5px 14px; border-radius: 4px; font-size: 13px; font-weight: 500;">${skill}</span>`).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Experience -->
            ${experience && experience.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 20px; font-weight: 600; color: #2d3748; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0;">PROFESSIONAL EXPERIENCE</h2>
                ${experience.map(exp => `
                    <div style="margin-bottom: 22px; padding-left: 15px; border-left: 3px solid #2d3748;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 6px; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 200px;">
                                <h3 style="font-size: 17px; font-weight: 600; color: #1a202c; margin: 0;">${exp.title || 'Job Title'}</h3>
                                <p style="font-size: 15px; color: #4a5568; margin: 3px 0; font-weight: 500;">${exp.company || 'Company'}</p>
                            </div>
                            <span style="color: #718096; font-size: 13px; font-weight: 500; white-space: nowrap;">${exp.startDate || ''} ${exp.endDate ? `- ${exp.endDate}` : ''}</span>
                        </div>
                        ${exp.description ? `<p style="color: #2d3748; margin-top: 8px; font-size: 14px; line-height: 1.7;">${exp.description.replace(/\n/g, '<br>')}</p>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Education -->
            ${education && education.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 20px; font-weight: 600; color: #2d3748; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0;">EDUCATION</h2>
                ${education.map(edu => `
                    <div style="margin-bottom: 15px; padding-left: 15px; border-left: 3px solid #2d3748;">
                        <h3 style="font-size: 16px; font-weight: 600; color: #1a202c; margin: 0;">${edu.degree || 'Degree'}</h3>
                        <p style="color: #4a5568; margin: 4px 0; font-size: 14px;">${edu.school || 'School'}${edu.graduationDate ? ` • ${edu.graduationDate}` : ''}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Projects -->
            ${projects && projects.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 20px; font-weight: 600; color: #2d3748; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0;">PROJECTS</h2>
                ${projects.map(proj => `
                    <div style="margin-bottom: 18px; padding: 15px; background: #f7fafc; border-radius: 5px; border: 1px solid #e2e8f0;">
                        <h3 style="font-size: 16px; font-weight: 600; color: #1a202c; margin: 0 0 8px 0;">${proj.name || 'Project Name'}</h3>
                        ${proj.description ? `<p style="color: #2d3748; margin: 6px 0; font-size: 14px; line-height: 1.7;">${proj.description.replace(/\n/g, '<br>')}</p>` : ''}
                        ${proj.technologies ? `<p style="color: #718096; font-size: 13px; margin: 8px 0 0 0;">Technologies: ${proj.technologies}</p>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Certifications -->
            ${certifications && certifications.length > 0 ? `
            <section style="margin-bottom: 25px;">
                <h2 style="font-size: 20px; font-weight: 600; color: #2d3748; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0;">CERTIFICATIONS</h2>
                ${certifications.map(cert => `
                    <div style="margin-bottom: 10px;">
                        <p style="color: #1a202c; margin: 0; font-size: 14px;"><strong>${cert.name || 'Certification'}</strong> - ${cert.issuer || 'Issuer'}${cert.date ? ` (${cert.date})` : ''}</p>
                    </div>
                `).join('')}
            </section>
            ` : ''}
        </div>
    `;
}

// Make renderTemplate globally available
window.renderTemplate = renderTemplate;

