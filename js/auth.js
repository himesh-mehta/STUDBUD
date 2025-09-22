// Authentication Management
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }
    
    init() {
        this.checkAuthState();
        this.setupEventListeners();
    }
    
    checkAuthState() {
        const savedUser = localStorage.getItem('studyhub-user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showMainApp();
        } else {
            this.showLoginPage();
        }
    }
    
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
        
        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup();
            });
        }
        
        // Show signup link
        const showSignupLink = document.getElementById('showSignup');
        if (showSignupLink) {
            showSignupLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSignupPage();
            });
        }
        
        // Show login link
        const showLoginLink = document.getElementById('showLogin');
        if (showLoginLink) {
            showLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginPage();
            });
        }
        
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }
    }
    
    async handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simulate API call
        try {
            const user = await this.simulateLogin(email, password);
            this.currentUser = user;
            localStorage.setItem('studyhub-user', JSON.stringify(user));
            this.showMainApp();
        } catch (error) {
            this.showError('Invalid email or password');
        }
    }
    
    async handleSignup() {
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        
        // Basic validation
        if (password.length < 6) {
            this.showError('Password must be at least 6 characters long');
            return;
        }
        
        try {
            const user = await this.simulateSignup(name, email, password);
            this.currentUser = user;
            localStorage.setItem('studyhub-user', JSON.stringify(user));
            this.showMainApp();
        } catch (error) {
            this.showError('Failed to create account. Please try again.');
        }
    }
    
    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('studyhub-user');
        this.showLoginPage();
    }
    
    simulateLogin(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simple validation - in real app, this would be an API call
                if (email && password) {
                    resolve({
                        id: Date.now(),
                        name: email.split('@')[0],
                        email: email,
                        avatar: '👤'
                    });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    }
    
    simulateSignup(name, email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name && email && password) {
                    resolve({
                        id: Date.now(),
                        name: name,
                        email: email,
                        avatar: '👤'
                    });
                } else {
                    reject(new Error('Invalid data'));
                }
            }, 1000);
        });
    }
    
    showLoginPage() {
        this.hideAllPages();
        document.getElementById('loginPage').classList.add('active');
    }
    
    showSignupPage() {
        this.hideAllPages();
        document.getElementById('signupPage').classList.add('active');
    }
    
    showMainApp() {
        this.hideAllPages();
        document.getElementById('mainApp').style.display = 'flex';
        
        // Update user info in sidebar
        if (this.currentUser) {
            document.getElementById('userName').textContent = this.currentUser.name;
            document.getElementById('userEmail').textContent = this.currentUser.email;
        }
        
        // Initialize app content
        if (window.app) {
            app.init();
        }
    }
    
    hideAllPages() {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById('mainApp').style.display = 'none';
    }
    
    showError(message) {
        // Create or update error message
        let errorDiv = document.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ef4444;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
            `;
            document.body.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
}

// Initialize auth manager
const authManager = new AuthManager();