document.addEventListener('DOMContentLoaded', function() {
    // Данные о фамилиях (в реальном проекте будут приходить с сервера)
    const surnamesData = [
        {
            name: "Жмакин",
            description: "Фамилия появляется в письменных источниках с XVI века – ее носили представители всех сословий: в частности, известно о жившем в 1560-е годы помещике Иване Жмакине в Новгородском уезде.",
            subscribers: "ОЖ АВ ГЖ"
        },
        {
            name: "Тиньков",
            description: "Фамилия появляется в письменных источниках с XVI века: Тиньковы (Тинкова) – старинный русский дворянский род столбового дворянства, внесен в Бархатную книгу. В XVII веке упоминается Тиньков Семен, дьяк Поместного приказа.",
            subscribers: "АО ДК ДЕ"
        },
        {
            name: "Красилов",
            description: "Первые упоминания фамилии Красилов приходятся на XIX век. Согласно окладным книгам 1845 года Вороланской волости Барнаульского уезда Томской губернии, крестьянин Степан Красилов владел мельницей на реке Чумыш.",
            subscribers: "ОМ ДК АК МП РУ"
        },
        {
            name: "Гайнутдинов",
            description: "Фамилия появляется в письменных источниках с XIX века: так, среди ссыльных Тобольской губернии в 1861 году был Гимилегдин Гайнутдинов. В переписи населения 1897 года зафиксированы несколько семей Гайнутдиновых в Казанской губернии.",
            subscribers: "СЛ № АЮ ВТ РГ"
        },
        {
            name: "Папасик",
            description: "В XIX веке фамилия была распространена в области Войска Донского, Родненской, Волынской, Тобольской и других губерниях Российской империи. Антропонимист А. Суперанская связывает происхождение фамилии с украинским словом 'папась' - отец.",
            subscribers: "ОА"
        },
        {
            name: "Мухамбетов",
            description: "В архивных документах времен Первой мировой войны зафиксировано, что в апреле 1915 года пропал без вести Кабыр-Нур Мухамбетов – рядовой 327-го пехотного Корсунского полка. Фамилия распространена среди казахов и татар.",
            subscribers: "на"
        }
    ];

    // Элементы DOM
    const surnameResults = document.getElementById('surnameResults');
    const searchBtn = document.getElementById('searchBtn');
    const surnameInput = document.getElementById('surnameInput');
    const loginBtn = document.querySelector('.login-btn');

    // Загрузка данных о фамилиях
    function loadSurnames(data) {
        surnameResults.innerHTML = '';
        
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'surname-card';
            card.innerHTML = `
                <h3 class="surname-title">${item.name}</h3>
                <p>${item.description}</p>
                <div class="subscribers">Подписались: ${item.subscribers}</div>
                <button class="btn find-btn" data-surname="${item.name}">Найти</button>
            `;
            surnameResults.appendChild(card);
        });

        // Добавляем обработчики для кнопок "Найти"
        document.querySelectorAll('.find-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const surname = this.getAttribute('data-surname');
                searchSurname(surname);
            });
        });
    }

    // Поиск фамилии
    function searchSurname(surname) {
        // В реальном проекте здесь будет AJAX-запрос к серверу
        console.log(`Поиск фамилии: ${surname}`);
        surnameInput.value = surname;
        
        // Прокрутка к полю ввода
        surnameInput.scrollIntoView({ behavior: 'smooth' });
        surnameInput.focus();
    }

    // Обработчик кнопки поиска
    searchBtn.addEventListener('click', function() {
        const searchTerm = surnameInput.value.trim();
        if (searchTerm) {
            searchSurname(searchTerm);
        }
    });

    // Обработчик нажатия Enter в поле ввода
    surnameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // Обработчик кнопки входа
    loginBtn.addEventListener('click', function() {
        // В реальном проекте здесь будет открытие модального окна входа
        console.log('Открытие формы входа');
    });

    // Инициализация - загрузка данных
    loadSurnames(surnamesData);
});