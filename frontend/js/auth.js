// Authentication JavaScript
const API_URL = '/api/auth';

// Check if on login or register page
const isLoginPage = window.location.pathname.includes('login.html');
const isRegisterPage = window.location.pathname.includes('register.html');

// Handle form submission
if (isLoginPage) {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
} else if (isRegisterPage) {
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('errorMessage');
    const submitBtn = e.target.querySelector('button[type="submit"]');

    // Clear previous errors
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';

    if (!email || !password) {
        errorDiv.textContent = 'Please fill in all fields';
        errorDiv.classList.remove('hidden');
        return;
    }

    // Disable button during request
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            console.error('Failed to parse response:', jsonError);
            errorDiv.textContent = 'Server error. Please check if the server is running.';
            errorDiv.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign In';
            return;
        }

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'dashboard.html';
        } else {
            errorDiv.textContent = data.error || 'Login failed. Please check your credentials.';
            errorDiv.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign In';
        }
    } catch (error) {
        console.error('Login error:', error);
        errorDiv.textContent = 'Network error. Please check your connection and ensure the server is running.';
        errorDiv.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign In';
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorDiv = document.getElementById('errorMessage');
    const submitBtn = e.target.querySelector('button[type="submit"]');

    // Clear previous errors
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';

    if (!email || !password || !confirmPassword) {
        errorDiv.textContent = 'Please fill in all fields';
        errorDiv.classList.remove('hidden');
        return;
    }

    if (password !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match';
        errorDiv.classList.remove('hidden');
        return;
    }

    if (password.length < 6) {
        errorDiv.textContent = 'Password must be at least 6 characters';
        errorDiv.classList.remove('hidden');
        return;
    }

    // Disable button during request
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account...';

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            console.error('Failed to parse response:', jsonError);
            errorDiv.textContent = 'Server error. Please check if the server is running.';
            errorDiv.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Account';
            return;
        }

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'dashboard.html';
        } else {
            errorDiv.textContent = data.error || 'Registration failed. Please try again.';
            errorDiv.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Account';
        }
    } catch (error) {
        console.error('Registration error:', error);
        errorDiv.textContent = 'Network error. Please check your connection and ensure the server is running.';
        errorDiv.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
    }
}

