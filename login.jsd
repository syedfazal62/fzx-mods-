document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.login-btn');
    let loginWindow = document.querySelector('.login-window');

    if (!loginWindow) {
        loginWindow = document.createElement('div');
        loginWindow.classList.add('login-window');
        loginWindow.style.position = 'fixed';
        loginWindow.style.top = '50%';
        loginWindow.style.left = '50%';
        loginWindow.style.transform = 'translate(-50%, -50%)';
        loginWindow.style.background = 'rgba(43, 43, 43, 0.95)';
        loginWindow.style.padding = '30px';
        loginWindow.style.borderRadius = '20px';
        loginWindow.style.boxShadow = '0 10px 40px rgba(255, 62, 0, 0.7)';
        loginWindow.style.zIndex = '1000';
        loginWindow.style.width = '350px';
        loginWindow.style.display = 'none';
        loginWindow.style.flexDirection = 'column';
        loginWindow.style.fontFamily = "'Montserrat', sans-serif";

        loginWindow.innerHTML = `
            <h2 style="color: white; font-size: 2rem; margin-bottom: 25px; font-weight: 700; text-align: center;">Login</h2>
            <input type="email" placeholder="Email" style="margin-bottom: 15px; padding: 12px; border-radius: 8px; border: none; width: 100%; font-size: 1rem; box-shadow: 0 0 8px rgba(255, 62, 0, 0.5);">
            <input type="password" placeholder="Password" style="margin-bottom: 25px; padding: 12px; border-radius: 8px; border: none; width: 100%; font-size: 1rem; box-shadow: 0 0 8px rgba(255, 62, 0, 0.5);">
            <button style="background: #ff3e00; color: white; padding: 14px; border: none; border-radius: 10px; cursor: pointer; font-size: 1.1rem; font-weight: 600; transition: background-color 0.3s ease;">Login</button>
        `;

        document.body.appendChild(loginWindow);
    }

    loginBtn.addEventListener('click', () => {
        if (loginWindow.style.display === 'flex') {
            loginWindow.style.display = 'none';
        } else {
            loginWindow.style.display = 'flex';
        }
    });

    // Close login window when clicking outside
    document.addEventListener('click', (event) => {
        if (loginWindow.style.display === 'flex' && !loginWindow.contains(event.target) && !loginBtn.contains(event.target)) {
            loginWindow.style.display = 'none';
        }
    });
});
