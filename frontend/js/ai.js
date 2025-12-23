// AI Suggestion JavaScript
let currentAISection = null;
let currentAISuggestion = null;
let currentAISuggestionData = null;

// Get AI suggestion
async function getAISuggestion(section, identifier) {
    const token = localStorage.getItem('token');
    let text = '';

    if (section === 'summary') {
        text = document.getElementById('summary').value;
    } else if (section === 'experience') {
        const exp = resumeData.experience[parseInt(identifier)];
        text = exp.description || '';
    } else if (section === 'projects') {
        const proj = resumeData.projects[parseInt(identifier)];
        text = proj.description || '';
    }

    if (!text.trim()) {
        alert('Please enter some text first');
        return;
    }

    try {
        const response = await fetch('/api/ai/suggest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text, section })
        });

        const data = await response.json();

        if (response.ok) {
            currentAISection = section;
            currentAISuggestion = identifier;
            currentAISuggestionData = data;
            
            document.getElementById('aiOriginal').textContent = data.original;
            document.getElementById('aiSuggestion').textContent = data.suggestion;
            document.getElementById('aiModal').classList.remove('hidden');
            document.getElementById('aiModal').classList.add('flex');
        } else {
            alert(data.error || 'Failed to get AI suggestion');
        }
    } catch (error) {
        console.error('AI suggestion error:', error);
        alert('Error getting AI suggestion. Make sure OpenAI API key is configured.');
    }
}

// Accept AI suggestion
function acceptAISuggestion() {
    if (!currentAISection || !currentAISuggestionData) return;

    if (currentAISection === 'summary') {
        document.getElementById('summary').value = currentAISuggestionData.suggestion;
        resumeData.summary = currentAISuggestionData.suggestion;
    } else if (currentAISection === 'experience') {
        const index = parseInt(currentAISuggestion);
        resumeData.experience[index].description = currentAISuggestionData.suggestion;
        renderExperience();
    } else if (currentAISection === 'projects') {
        const index = parseInt(currentAISuggestion);
        resumeData.projects[index].description = currentAISuggestionData.suggestion;
        renderProjects();
    }

    updatePreview();
    rejectAISuggestion();
}

// Reject AI suggestion
function rejectAISuggestion() {
    document.getElementById('aiModal').classList.add('hidden');
    document.getElementById('aiModal').classList.remove('flex');
    currentAISection = null;
    currentAISuggestion = null;
    currentAISuggestionData = null;
}

// Make functions globally available
window.getAISuggestion = getAISuggestion;
window.acceptAISuggestion = acceptAISuggestion;
window.rejectAISuggestion = rejectAISuggestion;

