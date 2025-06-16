// script/scroll-reveal.js

document.addEventListener('DOMContentLoaded', () => {
    setupScrollReveal(); // Chama a função para configurar o scroll reveal
});

function setupScrollReveal() {
    // Seleciona todos os elementos que possuem a classe 'hidden'
    const hiddenElements = document.querySelectorAll('.hidden');

    // Configurações para o Intersection Observer
    const observerOptions = {
        root: null, // O viewport (janela do navegador) é o elemento de referência
        rootMargin: '0px', // Margem em torno do root.
        threshold: 0.1 // O callback será executado quando 10% do elemento estiver visível no viewport
    };

    // Função que será chamada quando um elemento cruzar o limite de observação
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se o elemento está visível no viewport
                entry.target.classList.add('show'); // Adiciona a classe 'show' para disparar a animação

                // Lógica para o efeito escalonado nos cards de produto (.card-2)
                if (entry.target.classList.contains('card-2')) {
                    const productList = entry.target.closest('.produtos ul');
                    if (productList) {
                        const listItems = Array.from(productList.children);
                        const parentListItem = entry.target.parentElement; // O <li> que contém o .card-2
                        const index = listItems.indexOf(parentListItem);

                        if (index !== -1) {
                            entry.target.style.transitionDelay = `${index * 0.1}s`; // Atraso de 0.1s por card
                        }
                    }
                }
                
                // Parar de observar o elemento, pois já foi animado
                observer.unobserve(entry.target);
            }
            // Opcional: Se quiser que o elemento volte ao estado 'hidden' ao sair da tela,
            // adicione um 'else' aqui e re-observe o elemento.
            // else {
            //     entry.target.classList.remove('show');
            //     observer.observe(entry.target);
            // }
        });
    };

    // Cria uma nova instância do Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observa todos os elementos que têm a classe 'hidden'
    hiddenElements.forEach(el => observer.observe(el));
}