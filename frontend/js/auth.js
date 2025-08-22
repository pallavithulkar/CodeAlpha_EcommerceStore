// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const loginFormContainer = document.getElementById('loginForm');
const registerFormContainer = document.getElementById('registerForm');

// API Configuration
const API_CONFIG = {
    BASE_URL: 'http://localhost:5880/api',
    ENDPOINTS: {
        LOGIN: '/users/login',
        REGISTER: '/users'
    }
};

// Initialize error displays
function initErrorDisplays() {
    // Login form error display
    if (loginForm && !loginForm.querySelector('.error-display')) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-display';
        errorDiv.style.cssText = `
      color: #d32f2f;
      background-color: #ffebee;
      padding: 10px 15px;
      margin: 10px 0;
      border-radius: 4px;
      display: none;
    `;
        loginForm.appendChild(errorDiv);
    }

    // Register form error display
    if (registerForm && !registerForm.querySelector('.error-display')) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-display';
        errorDiv.style.cssText = `
      color: #d32f2f;
      background-color: #ffebee;
      padding: 10px 15px;
      margin: 10px 0;
      border-radius: 4px;
      display: none;
    `;
        registerForm.appendChild(errorDiv);
    }
}

// Form Toggle (unchanged)
if (showRegister && showLogin) {
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormContainer.classList.add('hidden');
        registerFormContainer.classList.remove('hidden');
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerFormContainer.classList.add('hidden');
        loginFormContainer.classList.remove('hidden');
    });
}

// Enhanced Login Handler
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        const errorDisplay = loginForm.querySelector('.error-display');

        try {
            // Reset UI
            errorDisplay.style.display = 'none';
            errorDisplay.textContent = '';
            submitBtn.disabled = true;
            submitBtn.textContent = 'Logging in...';

            // Get form values
            const credentials = {
                email: document.getElementById('email').value.trim(),
                password: document.getElementById('password').value.trim()
            };

            // Basic validation
            if (!credentials.email || !credentials.password) {
                throw new Error('Please fill in all fields');
            }

            console.log('Attempting login with:', credentials);

            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                credentials: 'include' // Important for cookies/sessions
            });

            console.log('Login response:', response);

            // Handle HTTP errors
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Login API error:', errorData);
                throw new Error(errorData.message || `Login failed (Status: ${response.status})`);
            }

            const data = await response.json();
            console.log('Login response data:', data);

            // Validate response structure
            if (!data.token) {
                throw new Error('Authentication token missing in response');
            }

            // Store user data
            localStorage.setItem('userInfo', JSON.stringify(data));
            console.log('User data stored:', JSON.parse(localStorage.getItem('userInfo')));

            // Force page reload to ensure state consistency
            window.location.href = 'index.html';

        } catch (error) {
            console.error('Login process failed:', error);
            errorDisplay.textContent = error.message;
            errorDisplay.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// Enhanced Registration Handler
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = registerForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        const errorDisplay = registerForm.querySelector('.error-display');

        try {
            // Reset UI
            errorDisplay.style.display = 'none';
            errorDisplay.textContent = '';
            submitBtn.disabled = true;
            submitBtn.textContent = 'Registering...';

            // Get form values
            const userData = {
                name: document.getElementById('reg-name').value.trim(),
                email: document.getElementById('reg-email').value.trim(),
                password: document.getElementById('reg-password').value.trim(),
                confirmPassword: document.getElementById('reg-confirm').value.trim()
            };

            // Validation
            if (!userData.name || !userData.email || !userData.password || !userData.confirmPassword) {
                throw new Error('Please fill in all fields');
            }

            if (userData.password !== userData.confirmPassword) {
                throw new Error('Passwords do not match');
            }

            if (userData.password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }

            console.log('Attempting registration with:', userData);

            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userData.name,
                    email: userData.email,
                    password: userData.password
                }),
                credentials: 'include'
            });

            console.log('Registration response:', response);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Registration API error:', errorData);
                throw new Error(errorData.message || `Registration failed (Status: ${response.status})`);
            }

            const data = await response.json();
            console.log('Registration response data:', data);

            // Auto-login after registration
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location.href = 'index.html';

        } catch (error) {
            console.error('Registration process failed:', error);
            errorDisplay.textContent = error.message;
            errorDisplay.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// Check authentication state
document.addEventListener('DOMContentLoaded', () => {
    initErrorDisplays();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo?.token) {
        console.log('User already logged in, redirecting...');
        window.location.href = 'index.html';
    }
});