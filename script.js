/* ===========================================
   INVESTIGAÇÃO SQL — GAME LOGIC
   Slide navigation and animation system
   =========================================== */

// ---- STATE ----
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// ---- NAVIGATION ----

/**
 * Avança para o próximo slide.
 */
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
}

/**
 * Vai para um slide específico pelo índice (0-based).
 * @param {number} index - Índice do slide destino.
 */
function goToSlide(index) {
    if (index < 0 || index >= totalSlides || index === currentSlide) return;

    // Esconde o slide atual
    slides[currentSlide].classList.remove('active');

    // Mostra o novo slide
    currentSlide = index;
    slides[currentSlide].classList.add('active');

    // Dispara as animações do novo slide
    animateSlide(slides[currentSlide]);
}

// ---- ANIMATIONS ----

/**
 * Anima os elementos de um slide sequencialmente.
 * @param {HTMLElement} slide - O elemento do slide a animar.
 */
function animateSlide(slide) {
    // Reseta todos os fade-items
    const fadeItems = slide.querySelectorAll('.fade-item');
    fadeItems.forEach(item => item.classList.remove('visible'));

    // Anima cada item com delay sequencial
    fadeItems.forEach((item, i) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, 300 + i * 350);
    });

    // Para o slide de intro (slide 1), animar typewriter lines e outros elements com data-delay
    const delayElements = slide.querySelectorAll('[data-delay]');
    delayElements.forEach(el => {
        el.classList.remove('visible');
        const delay = parseInt(el.getAttribute('data-delay'), 10);
        setTimeout(() => {
            el.classList.add('visible');
        }, delay);
    });
}

// ---- KEYBOARD NAVIGATION ----
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
            e.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            if (currentSlide > 0) {
                goToSlide(currentSlide - 1);
            }
            break;
    }
});

// ---- INITIALIZE ----

/**
 * Inicializa o jogo ao carregar a página.
 */
function init() {
    // Garante que apenas o primeiro slide está visível
    slides.forEach((slide, i) => {
        if (i === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    // Anima o primeiro slide
    animateSlide(slides[0]);
}

// Roda ao carregar
document.addEventListener('DOMContentLoaded', init);
