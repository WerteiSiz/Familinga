document.addEventListener('DOMContentLoaded', function() {
    // Выход из аккаунта
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Вы уверены, что хотите выйти?')) {
            // Здесь будет логика выхода
            window.location.href = 'login.html';
        }
    });

    // Загрузка данных пользователя
    function loadUserData() {
        // Здесь будет запрос к API для получения данных пользователя
        console.log('Загрузка данных пользователя...');
    }

    loadUserData();
});