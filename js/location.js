document.addEventListener('DOMContentLoaded', function() {
    // Инициализация бокового меню
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Обработка поиска
    const searchBtn = document.querySelector('.search-places .btn');
    const searchInput = document.querySelector('.search-places input');
    
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Пошук місця: ${searchTerm}`);
            // Здесь будет AJAX-запрос к серверу
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // Инициализация карты (заглушка)
    console.log('Тут буде ініціалізація інтерактивної карти');
});