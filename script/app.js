const track = document.querySelector('.bannerCarrossel');
const items = Array.from(track.children);
const prevButton = document.querySelector('.buttonCarrossel.prev');
const nextButton = document.querySelector('.buttonCarrossel.next');

let currentIndex = 0;
let autoSlideInterval;

// Atualiza a posição do carrossel
function updateCarousel() {
    const width = items[0].getBoundingClientRect().width;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * width}px)`;
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