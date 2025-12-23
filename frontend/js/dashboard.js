// Dashboard JavaScript - Main resume builder logic
let resumeData = {
    personalInfo: {},
    summary: '',
    skills: [],
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    template: 'minimal'
};

let currentStep = 'personal';
let currentAISection = null;
let currentAISuggestion = null;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadResume();
    setupStepNavigation();
    setupThemeToggle();
    setupLogout();
    setupAutoSave();
    setupTemplateChange();
});

// Check authentication
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    fetch('/api/auth/verify', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if (!data.valid) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        }
    })
    .catch(() => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
}

// Load resume data
async function loadResume() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('/api/resume', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (data) {
            resumeData = { ...resumeData, ...data };
            populateForm();
            updatePreview();
        }
    } catch (error) {
        console.error('Failed to load resume:', error);
    }
}

// Populate form with data
function populateForm() {
    // Personal Info
    if (resumeData.personalInfo) {
        document.getElementById('fullName').value = resumeData.personalInfo.fullName || '';
        document.getElementById('email').value = resumeData.personalInfo.email || '';
        document.getElementById('phone').value = resumeData.personalInfo.phone || '';
        document.getElementById('location').value = resumeData.personalInfo.location || '';
        document.getElementById('linkedin').value = resumeData.personalInfo.linkedin || '';
    }

    // Summary
    document.getElementById('summary').value = resumeData.summary || '';

    // Skills
    if (resumeData.skills && resumeData.skills.length > 0) {
        renderSkills();
    }

    // Experience
    if (resumeData.experience && resumeData.experience.length > 0) {
        renderExperience();
    }

    // Education
    if (resumeData.education && resumeData.education.length > 0) {
        renderEducation();
    }

    // Projects
    if (resumeData.projects && resumeData.projects.length > 0) {
        renderProjects();
    }

    // Certifications
    if (resumeData.certifications && resumeData.certifications.length > 0) {
        renderCertifications();
    }

    // Template
    if (resumeData.template) {
        document.getElementById('templateSelect').value = resumeData.template;
    }
}

// Setup step navigation
function setupStepNavigation() {
    const stepButtons = document.querySelectorAll('.step-btn');
    stepButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const step = btn.dataset.step;
            switchStep(step);
        });
    });
}

// Switch between steps
function switchStep(step) {
    currentStep = step;

    // Update button states
    document.querySelectorAll('.step-btn').forEach(btn => {
        if (btn.dataset.step === step) {
            btn.classList.add('active', 'bg-blue-600', 'text-white');
            btn.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
        } else {
            btn.classList.remove('active', 'bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
        }
    });

    // Show/hide step content
    document.querySelectorAll('.step-content').forEach(content => {
        if (content.id === `step-${step}`) {
            content.classList.remove('hidden');
        } else {
            content.classList.add('hidden');
        }
    });
}

// Setup theme toggle
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }

    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        if (isDark) {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
        
        updatePreview();
    });
}

// Setup logout
function setupLogout() {
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });
}

// Setup auto-save on input change
function setupAutoSave() {
    // Personal Info
    ['fullName', 'email', 'phone', 'location', 'linkedin'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', () => {
                resumeData.personalInfo[id] = input.value;
                updatePreview();
            });
        }
    });

    // Summary
    const summary = document.getElementById('summary');
    if (summary) {
        summary.addEventListener('input', () => {
            resumeData.summary = summary.value;
            updatePreview();
        });
    }
}

// Setup template change
function setupTemplateChange() {
    document.getElementById('templateSelect').addEventListener('change', (e) => {
        resumeData.template = e.target.value;
        updatePreview();
    });
}

// Add Skills
function addSkills() {
    const input = document.getElementById('skillsInput');
    const skills = input.value.split(',').map(s => s.trim()).filter(s => s);
    
    if (skills.length > 0) {
        resumeData.skills = [...new Set([...resumeData.skills, ...skills])];
        input.value = '';
        renderSkills();
        updatePreview();
    }
}

// Render Skills
function renderSkills() {
    const container = document.getElementById('skillsList');
    container.innerHTML = resumeData.skills.map((skill, index) => `
        <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center">
            ${skill}
            <button onclick="removeSkill(${index})" class="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800">×</button>
        </span>
    `).join('');
}

// Remove Skill
function removeSkill(index) {
    resumeData.skills.splice(index, 1);
    renderSkills();
    updatePreview();
}

// Add Experience
function addExperience() {
    const id = Date.now();
    resumeData.experience.push({
        id,
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
    });
    renderExperience();
}

// Render Experience
function renderExperience() {
    const container = document.getElementById('experienceList');
    container.innerHTML = resumeData.experience.map((exp, index) => `
        <div class="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Job Title</label>
                    <input type="text" value="${exp.title || ''}" onchange="updateExperience(${index}, 'title', this.value)" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                </div>
                <div>
                    <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Company</label>
                    <input type="text" value="${exp.company || ''}" onchange="updateExperience(${index}, 'company', this.value)" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Start Date</label>
                    <input type="text" value="${exp.startDate || ''}" placeholder="MM/YYYY" onchange="updateExperience(${index}, 'startDate', this.value)" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                </div>
                <div>
                    <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">End Date</label>
                    <input type="text" value="${exp.endDate || ''}" placeholder="MM/YYYY or Present" onchange="updateExperience(${index}, 'endDate', this.value)" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                </div>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Description</label>
                <textarea rows="3" onchange="updateExperience(${index}, 'description', this.value)" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">${exp.description || ''}</textarea>
                <button type="button" onclick="getAISuggestion('experience', '${index}')" class="mt-1 text-blue-600 dark:text-cyan-400 hover:underline text-xs">Get AI Suggestion</button>
            </div>
            <button onclick="removeExperience(${index})" class="text-red-600 hover:text-red-800 text-sm">Remove</button>
        </div>
    `).join('');
}

// Update Experience
function updateExperience(index, field, value) {
    resumeData.experience[index][field] = value;
    updatePreview();
}

// Remove Experience
function removeExperience(index) {
    resumeData.experience.splice(index, 1);
    renderExperience();
    updatePreview();
}

// Add Education
function addEducation() {
    const id = Date.now();
    resumeData.education.push({
        id,
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
        gpa: ''
    });
    renderEducation();
}

// Render Education
function renderEducation() {
    const container = document.getElementById('educationList');
    container.innerHTML = resumeData.education.map((edu, index) => `
        <div class="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Degree</label>
                    <input type="text" value="${edu.degree || ''}" onchange="updateEducation(${index}, 'degree', this.value)" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                </div>
                <div>
                    <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">School</label>
                    <input type="text" value="${edu.school || ''}" onchange="updateEducation(${index}, 'school', this.value)" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Graduation Date</label>
                    <input type="text" value="${edu.graduationDate || ''}" placeholder="MM/YYYY" onchange="updateEducation(${index}, 'graduationDate', this.value)" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                </div>
                <div>
                    <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">GPA (optional)</label>
                    <input type="text" value="${edu.gpa || ''}" onchange="updateEducation(${index}, 'gpa', this.value)" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                </div>
            </div>
            <button onclick="removeEducation(${index})" class="mt-4 text-red-600 hover:text-red-800 text-sm">Remove</button>
        </div>
    `).join('');
}

// Update Education
function updateEducation(index, field, value) {
    resumeData.education[index][field] = value;
    updatePreview();
}

// Remove Education
function removeEducation(index) {
    resumeData.education.splice(index, 1);
    renderEducation();
    updatePreview();
}

// Add Project
function addProject() {
    const id = Date.now();
    resumeData.projects.push({
        id,
        name: '',
        description: '',
        technologies: '',
        link: ''
    });
    renderProjects();
}

// Render Projects
function renderProjects() {
    const container = document.getElementById('projectsList');
    container.innerHTML = resumeData.projects.map((proj, index) => `
        <div class="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Project Name</label>
                <input type="text" value="${proj.name || ''}" onchange="updateProject(${index}, 'name', this.value)" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Description</label>
                <textarea rows="3" onchange="updateProject(${index}, 'description', this.value)" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">${proj.description || ''}</textarea>
                <button type="button" onclick="getAISuggestion('projects', '${index}')" class="mt-1 text-blue-600 dark:text-cyan-400 hover:underline text-xs">Get AI Suggestion</button>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Technologies</label>
                    <input type="text" value="${proj.technologies || ''}" onchange="updateProject(${index}, 'technologies', this.value)" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                </div>
                <div>
                    <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Link (optional)</label>
                    <input type="url" value="${proj.link || ''}" onchange="updateProject(${index}, 'link', this.value)" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                </div>
            </div>
            <button onclick="removeProject(${index})" class="mt-4 text-red-600 hover:text-red-800 text-sm">Remove</button>
        </div>
    `).join('');
}

// Update Project
function updateProject(index, field, value) {
    resumeData.projects[index][field] = value;
    updatePreview();
}

// Remove Project
function removeProject(index) {
    resumeData.projects.splice(index, 1);
    renderProjects();
    updatePreview();
}

// Add Certification
function addCertification() {
    const id = Date.now();
    resumeData.certifications.push({
        id,
        name: '',
        issuer: '',
        date: '',
        link: ''
    });
    renderCertifications();
}

// Render Certifications
function renderCertifications() {
    const container = document.getElementById('certificationsList');
    container.innerHTML = resumeData.certifications.map((cert, index) => `
        <div class="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Certification Name</label>
                    <input type="text" value="${cert.name || ''}" onchange="updateCertification(${index}, 'name', this.value)" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                </div>
                <div>
                    <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Issuer</label>
                    <input type="text" value="${cert.issuer || ''}" onchange="updateCertification(${index}, 'issuer', this.value)" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Date</label>
                    <input type="text" value="${cert.date || ''}" placeholder="MM/YYYY" onchange="updateCertification(${index}, 'date', this.value)" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                </div>
                <div>
                    <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Link (optional)</label>
                    <input type="url" value="${cert.link || ''}" onchange="updateCertification(${index}, 'link', this.value)" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                </div>
            </div>
            <button onclick="removeCertification(${index})" class="mt-4 text-red-600 hover:text-red-800 text-sm">Remove</button>
        </div>
    `).join('');
}

// Update Certification
function updateCertification(index, field, value) {
    resumeData.certifications[index][field] = value;
    updatePreview();
}

// Remove Certification
function removeCertification(index) {
    resumeData.certifications.splice(index, 1);
    renderCertifications();
    updatePreview();
}

// Save Resume
async function saveResume() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('/api/resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(resumeData)
        });

        if (response.ok) {
            alert('Resume saved successfully!');
        } else {
            alert('Failed to save resume');
        }
    } catch (error) {
        console.error('Save error:', error);
        alert('Error saving resume');
    }
}

// Update Preview
function updatePreview() {
    const preview = document.getElementById('resumePreview');
    const template = resumeData.template || 'minimal';
    
    if (window.renderTemplate) {
        preview.innerHTML = window.renderTemplate(template, resumeData);
    }
}

// Make functions globally available
window.addSkills = addSkills;
window.removeSkill = removeSkill;
window.addExperience = addExperience;
window.removeExperience = removeExperience;
window.updateExperience = updateExperience;
window.renderExperience = renderExperience;
window.addEducation = addEducation;
window.removeEducation = removeEducation;
window.updateEducation = updateEducation;
window.renderEducation = renderEducation;
window.addProject = addProject;
window.removeProject = removeProject;
window.updateProject = updateProject;
window.renderProjects = renderProjects;
window.addCertification = addCertification;
window.removeCertification = removeCertification;
window.updateCertification = updateCertification;
window.renderCertifications = renderCertifications;
window.saveResume = saveResume;
window.updatePreview = updatePreview;
window.renderSkills = renderSkills;

