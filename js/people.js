document.addEventListener('DOMContentLoaded', function() {
    // Инициализация поиска
    const searchBtn = document.querySelector('.search-btn');
    const fullNameInput = document.getElementById('fullName');
    const birthYearInput = document.getElementById('birthYear');
    
    searchBtn.addEventListener('click', function() {
        const fullName = fullNameInput.value.trim();
        const birthYear = birthYearInput.value.trim();
        
        if (fullName || birthYear) {
            alert(`Выполняется поиск: ${fullName} ${birthYear ? `(год рождения: ${birthYear})` : ''}`);
            // Здесь будет AJAX-запрос к серверу
        } else {
            alert('Введите данные для поиска');
        }
    });
    
    // Обработка нажатия Enter в полях ввода
    [fullNameInput, birthYearInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    });
    
    // Инициализация расширенного поиска
    const advancedSearchLink = document.querySelector('.advanced-search-link');
    advancedSearchLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Открывается форма расширенного поиска');
        // Здесь будет логика открытия расширенного поиска
    });
    
    // Инициализация карточек людей
    const personCards = document.querySelectorAll('.person-card');
    personCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('h3').textContent;
            console.log(`Открывается страница: ${name}`);
            // Здесь будет переход на страницу человека
        });
    });
});