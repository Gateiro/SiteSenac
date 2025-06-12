const track = document.querySelector('.carousel-track');
const items = Array.from(track.querySelectorAll('.carousel-item'));
const prevButton = document.querySelector('.buttonCarrossel.prev');
const nextButton = document.querySelector('.buttonCarrossel.next');
const conteudos = document.querySelectorAll('.banner-conteudo');

let currentIndex = 0;
let autoSlideInterval;

function updateCarousel() {
    const width = items[0].getBoundingClientRect().width;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * width}px)`;

    // Atualiza o conteúdo do banner
    conteudos.forEach((el, idx) => {
        el.classList.toggle('active', idx === currentIndex);
    });
}

// Avança automaticamente o carrossel
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }, 5000); // 5 segundos
}

// Pausa o avanço automático
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Eventos para os botões de navegação
nextButton.addEventListener('click', () => {
    stopAutoSlide();
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
    startAutoSlide();
});

prevButton.addEventListener('click', () => {
    stopAutoSlide();
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
    startAutoSlide();
});

// Reinicia a posição do carrossel ao redimensionar a janela
window.addEventListener('resize', updateCarousel);

// Inicia o carrossel automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
    startAutoSlide();
});