document.addEventListener('DOMContentLoaded', function () {
    
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function () {
        // deleteCookie('username');
        window.location.href = './login.html';
    });

    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
});
