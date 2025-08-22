// DOM Elements
const cartItemsList = document.getElementById('cart-items-list');
const cartEmpty = document.getElementById('cart-empty');
const subtotalEl = document.getElementById('subtotal');
const shippingEl = document.getElementById('shipping');
const totalEl = document.getElementById('total');
const checkoutBtn = document.querySelector('.checkout-btn');

// Load cart items
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartEmpty.classList.remove('hidden');
        cartItemsList.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        cartItemsList.classList.remove('hidden');

        cartItemsList.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <div class="cart-item-quantity">
                            <button class="cart-item-quantity-btn minus">-</button>
                            <input type="number" value="${item.quantity}" min="1" class="cart-item-quantity-input">
                            <button class="cart-item-quantity-btn plus">+</button>
                        </div>
                        <span class="remove-item">Remove</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to quantity buttons
        document.querySelectorAll('.cart-item-quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemEl = e.target.closest('.cart-item');
                const itemId = parseInt(itemEl.getAttribute('data-id'));
                updateQuantity(itemId, -1);
            });
        });

        document.querySelectorAll('.cart-item-quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemEl = e.target.closest('.cart-item');
                const itemId = parseInt(itemEl.getAttribute('data-id'));
                updateQuantity(itemId, 1);
            });
        });

        // Add event listeners to quantity inputs
        document.querySelectorAll('.cart-item-quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const itemEl = e.target.closest('.cart-item');
                const itemId = parseInt(itemEl.getAttribute('data-id'));
                const newQuantity = parseInt(e.target.value);

                if (newQuantity > 0) {
                    setQuantity(itemId, newQuantity);
                } else {
                    e.target.value = 1;
                }
            });
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemEl = e.target.closest('.cart-item');
                const itemId = parseInt(itemEl.getAttribute('data-id'));
                removeItem(itemId);
            });
        });
    }

    updateCartSummary();
}

function updateQuantity(itemId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity < 1) {
            cart[itemIndex].quantity = 1;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
    }
}

function setQuantity(itemId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
    }
}

function removeItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId);

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const total = subtotal + shipping;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    shippingEl.textContent = `$${shipping.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

// Checkout button
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // In a real app, this would redirect to a checkout page
        alert('Proceeding to checkout! This would redirect to a payment page in a real app.');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartCount();
});