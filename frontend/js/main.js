// Main JavaScript for landing page
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
        // Verify token
        fetch('/api/auth/verify', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.valid) {
                window.location.href = 'dashboard.html';
            }
        })
        .catch(() => {
            localStorage.removeItem('token');
        });
    }
});

