document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const rememberCheckbox = document.getElementById('remember');

    const storedUsername = getCookie('username');
    const storedPassword = getCookie('password');
    if (storedUsername) {
        loginForm.username.value = storedUsername;
        loginForm.password.value = storedPassword;
        rememberCheckbox.checked = true;
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;
        const remember = rememberCheckbox.checked;

        // Simulate login success
        if (username === 'user' && password === 'pass') {
            if (remember) {
                setCookie('username', username);
                setCookie('password', password);
            } else {
                deleteCookie('username');
                deleteCookie('password');
            }
            redirectToDashboard();
        }
    });


    function setCookie(name, value, remember) {
        document.cookie = `${name}=${value}; path=/`;
    }

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }

    function redirectToDashboard() {
        window.location.href = 'dashboard.html';
    }

    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
});
