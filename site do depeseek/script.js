// Menu Mobile
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('active');
});

// Scroll Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.secao').forEach((section) => {
    observer.observe(section);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.menu').classList.remove('active');
    });
});

// INICIAR O AOS 
AOS.init();

// Carrinho de Compras
let cart = [];
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.total-price');
const cartCount = document.querySelector('.cart-count');
const cartOverlay = document.createElement('div');
cartOverlay.className = 'cart-overlay';

document.body.appendChild(cartOverlay);

// Funções do Carrinho
function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCart();
}

function updateCart() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    renderCartItems();
    calculateTotal();
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>R$ ${item.price} x ${item.quantity}</p>
            </div>
            <span class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</span>
            <span class="remove-item">&times;</span>
        `;
        cartItem.querySelector('.remove-item').addEventListener('click', () => removeFromCart(item));
        cartItemsContainer.appendChild(cartItem);
    });
}

function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(itemToRemove) {
    cart = cart.filter(item => item !== itemToRemove);
    updateCart();
}

// Event Listeners
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
});

cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

document.querySelector('.close-cart').addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

document.querySelector('.continue-shopping').addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

// Adicionar produtos ao carrinho
document.querySelectorAll('.produto-card').forEach(card => {
    const addButton = card.querySelector('.quick-view');
    addButton.textContent = 'Add to Cart';
    addButton.addEventListener('click', () => {
        const product = {
            name: card.querySelector('.produto-nome').textContent,
            price: parseFloat(card.querySelector('.produto-preco').textContent.replace('R$ ', '').replace(',', '.')),
            image: card.querySelector('.produto-img').src
        };
        addToCart(product);
    });
});
