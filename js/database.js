document.addEventListener('DOMContentLoaded', function() {
    // Инициализация поиска в архивных документах
    const archiveSearchBtn = document.querySelector('#archiveDocuments .search-btn');
    const archiveSearchInput = document.querySelector('#archiveDocuments input');
    
    archiveSearchBtn.addEventListener('click', function() {
        const searchTerm = archiveSearchInput.value.trim();
        if (searchTerm) {
            alert(`Поиск в архивных документах: "${searchTerm}"`);
            // Здесь будет AJAX-запрос к серверу
        } else {
            alert('Введите поисковый запрос');
        }
    });
    
    archiveSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            archiveSearchBtn.click();
        }
    });

    // Инициализация поиска в справочниках
    const referenceSearchBtn = document.querySelector('#referenceBooks .search-btn');
    const referenceSearchInput = document.querySelector('#referenceBooks input');
    
    referenceSearchBtn.addEventListener('click', function() {
        const searchTerm = referenceSearchInput.value.trim();
        if (searchTerm) {
            alert(`Поиск в справочниках: "${searchTerm}"`);
            // Здесь будет AJAX-запрос к серверу
        } else {
            alert('Введите поисковый запрос');
        }
    });
    
    referenceSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            referenceSearchBtn.click();
        }
    });

    // Анимация при наведении на карточки
    const databaseCards = document.querySelectorAll('.database-card');
    databaseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.badge').classList.add('animate__animated', 'animate__pulse');
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.badge').classList.remove('animate__animated', 'animate__pulse');
        });
    });

    // Инициализация кнопки входа
    const loginBtn = document.querySelector('.btn-outline-primary');
    loginBtn.addEventListener('click', function() {
        console.log('Открытие формы входа');
        // Здесь будет логика открытия модального окна входа
    });

    // Подсветка активного пункта меню
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});