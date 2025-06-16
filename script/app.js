// script/app.js

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

    conteudos.forEach((el, idx) => {
        el.classList.toggle('active', idx === currentIndex);
    });
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }, 5000); // 5 segundos
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

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

window.addEventListener('resize', updateCarousel);

// Inicia o carrossel automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
    startAutoSlide();
    // A função setupScrollReveal() será chamada do novo arquivo scroll-reveal.js
});