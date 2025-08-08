document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.login-btn');
    let loginWindow = document.querySelector('.login-window');
    let overlay = document.querySelector('.login-overlay');
    // Create overlay if it doesn't exist
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('login-overlay');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(overlay);
    }

    // Create login window if it doesn't exist
    if (!loginWindow) {
        loginWindow = document.createElement('div');
        loginWindow.classList.add('login-window');
        loginWindow.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: linear-gradient(135deg, rgba(43, 43, 43, 0.98), rgba(60, 60, 60, 0.98));
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 15px 40px rgba(255, 62, 0, 0.4);
            z-index: 1000;
            width: 320px;
            max-width: 90vw;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            font-family: 'Montserrat', sans-serif;
            border: 1px solid rgba(255, 62, 0, 0.3);
        `;

        loginWindow.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: white; font-size: 1.8rem; margin-bottom: 5px; font-weight: 700; 
                           background: linear-gradient(45deg, #ff3e00, #ff6a00); -webkit-background-clip: text; 
                           -webkit-text-fill-color: transparent; background-clip: text;">
                    Login
                </h2>
            </div>
            
            <form id="loginForm">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; color: #ff3e00; margin-bottom: 5px; font-weight: 600; font-size: 0.85rem;">
                        Email
                    </label>
                    <input type="email" 
                           placeholder="Enter email" 
                           required
                           style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255, 62, 0, 0.3); 
                                  background: rgba(255, 25, 255, 0.1); color: white; font-size: 0.9rem; 
                                  transition: all 0.3s ease; backdrop-filter: blur(10px);">
                </div>
                
                <div style="margin-bottom: 20px; position: relative;">
                    <label style="display: block; color: #ff3e00; margin-bottom: 5px; font-weight: 600; font-size: 0.85rem;">
                        Password
                    </label>
                    <div style="position: relative;">
                        <input type="password" 
                               id="passwordInput"
                               placeholder="Enter password" 
                               required
                               style="width: 100%; padding: 12px 40px 12px 12px; border-radius: 8px; border: 1px solid rgba(255, 62, 0, 0.3); 
                                      background: rgba(255, 255, 255, 0.1); color: white; font-size: 0.9rem; 
                                      transition: all 0.3s ease; backdrop-filter: blur(10px);">
                        <button type="button" 
                                id="togglePassword"
                                style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); 
                                       background: none; border: none; color: #ff3e00; cursor: pointer; 
                                       padding: 5px; font-size: 1.1rem;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 0.8rem;">
                    <label style="display: flex; align-items: center; color: #ccc;">
                        <input type="checkbox" style="margin-right: 5px;"> Remember Me
                    </label>
                    <a href="#" style="color: #ff3e00; text-decoration: none;">Forgot password?</a>
                </div>
                
                <button type="submit" 
                        style="width: 100%; background: linear-gradient(45deg, #ff3e00, #ff6a00); color: white; 
                               padding: 12px; border: none; border-radius: 8px; cursor: pointer; 
                               font-size: 1rem; font-weight: 600; transition: all 0.3s ease; 
                               text-transform: uppercase; letter-spacing: 1px;">
                    Sign In
                </button>
                
                <div style="text-align: center; margin-top: 15px; color: #ccc; font-size: 0.8rem;">
                    No account? <a href="#" style="color: #ff3e00; text-decoration: none;">Sign up</a>
                </div>
            </form>
            
            <button class="close-btn" style="position: absolute; top: 10px; right: 10px; 
                                           background: none; border: none; color: #ff3e00; 
                                           font-size: 1.3rem; cursor: pointer; padding: 5px;">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        `;

        document.body.appendChild(loginWindow);
    }

    // Add focus styles for inputs
    const style = document.createElement('style');
    style.textContent = `
        .login-window input:focus {
            outline: none;
            border-color: #ff3e00 !important;
            box-shadow: 0 0 10px rgba(255, 62, 0, 0.5) !important;
            background: rgba(255, 255, 255, 0.15) !important;
        }
        
        .login-window input::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }
        
        @keyframes shake {
            0%, 100% { transform: translate(-50%, -50%) translateX(0); }
            25% { transform: translate(-50%, -50%) translateX(-5px); }
            75% { transform: translate(-50%, -50%) translateX(5px); }
        }
        
        .login-window.shake {
            animation: shake 0.5s ease-in-out;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 62, 0, 0.7); }
            70% { box-shadow: 0 0 0 8px rgba(255, 62, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 62, 0, 0); }
        }
        
        .login-window button:hover {
            transform: translateY(-2px);
            box-shadow: 0 3px 10px rgba(255, 62, 0, 0.4);
        }
        
        .login-window button:active {
            transform: translateY(0);
        }
        
        @media (max-width: 768px) {
            .login-window {
                width: 95vw;
                padding: 20px;
            }
        }
    `;
    document.head.appendChild(style);

    // Event listeners
    loginBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLoginWindow();
    });

    overlay.addEventListener('click', closeLoginWindow);
    
    const closeBtn = loginWindow.querySelector('.close-btn');
    closeBtn.addEventListener('click', closeLoginWindow);

    // Form submission
    const loginForm = loginWindow.querySelector('#loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Signing In...';
        submitBtn.disabled = true;
        
        // Simulate login process
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            closeLoginWindow();
            
            // Show success message
            showNotification('Successfully logged in!', 'success');
        }, 1500);
    });

    // Password visibility toggle
    const togglePassword = loginWindow.querySelector('#togglePassword');
    const passwordInput = loginWindow.querySelector('#passwordInput');
    
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Change eye icon based on state
        const svg = togglePassword.querySelector('svg');
        if (type === 'text') {
            svg.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            `;
        } else {
            svg.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        }
    });

    // Prevent clicks inside login window from closing it
    loginWindow.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Functions
    function openLoginWindow() {
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        
        loginWindow.style.opacity = '1';
        loginWindow.style.visibility = 'visible';
        loginWindow.style.transform = 'translate(-50%, -50%) scale(1)';
    }

    function closeLoginWindow() {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        
        loginWindow.style.opacity = '0';
        loginWindow.style.visibility = 'hidden';
        loginWindow.style.transform = 'translate(-50%, -50%) scale(0.8)';
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(45deg, #00c851, #00ff00)' : 'linear-gradient(45deg, #ff4444, #cc0000)'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-family: 'Montserrat', sans-serif;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginWindow.style.visibility === 'visible') {
            closeLoginWindow();
        }
    });
});
