document.addEventListener('DOMContentLoaded', function() {
    // Анимация кнопки "Начать сейчас"
    const startBtn = document.querySelector('.start-btn');
    if (startBtn) {
        startBtn.addEventListener('mouseenter', function() {
            this.classList.add('animate__animated', 'animate__pulse');
        });
        
        startBtn.addEventListener('mouseleave', function() {
            this.classList.remove('animate__animated', 'animate__pulse');
        });
    }

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация элементов при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .tree-image, .accordion-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Инициализация при загрузке

    // Инициализация карусели с автопрокруткой
    const myCarousel = document.querySelector('#featuresCarousel');
    if (myCarousel) {
        const carousel = new bootstrap.Carousel(myCarousel, {
            interval: 3000,
            pause: 'hover',
            wrap: true
        });
    }

    // Показать/скрыть кнопку "Наверх"
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTopButton.className = 'btn btn-primary btn-back-to-top';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
            backToTopButton.classList.add('animate__animated', 'animate__fadeIn');
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});