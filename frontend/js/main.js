// DOM Elements
const cartCount = document.querySelector('.cart-count');
const productGrid = document.querySelector('.product-grid');
const aiRecommendBtn = document.getElementById('ai-recommend-btn');
const moodInput = document.getElementById('mood-input');
const aiResult = document.getElementById('ai-result');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const loginForm = document.querySelector('.auth-form');
const registerForm = document.querySelector('.register-form');

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Load popular products
function loadPopularProducts() {
    if (!productGrid) return;

    // In a real app, this would come from an API
    const products = [
        {
            id: 1,
            name: "Dark Chocolate Truffles",
            price: 12.99,
            image: "images/dark-truffles.jpg",
            rating: 4.5
        },
        {
            id: 2,
            name: "Milk Chocolate Bar",
            price: 8.99,
            image: "images/milk-chocolate.jpg",
            rating: 4.2
        },
        {
            id: 3,
            name: "White Chocolate Raspberry",
            price: 10.99,
            image: "images/white-raspberry.jpg",
            rating: 4.7
        },
        {
            id: 4,
            name: "Assorted Chocolate Box",
            price: 24.99,
            image: "images/assorted-box.jpg",
            rating: 4.8
        }
    ];

    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

function addToCart(productId) {
    // In a real app, we'd get product details from an API
    const products = {
        1: { name: "Dark Chocolate Truffles", price: 12.99, image: "images/dark-truffles.jpg" },
        2: { name: "Milk Chocolate Bar", price: 8.99, image: "images/milk-chocolate.jpg" },
        3: { name: "White Chocolate Raspberry", price: 10.99, image: "images/white-raspberry.jpg" },
        4: { name: "Assorted Chocolate Box", price: 24.99, image: "images/assorted-box.jpg" }
    };

    const product = products[productId];
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Show a quick notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${product.name} added to cart!`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// AI Recommendation
if (aiRecommendBtn) {
    aiRecommendBtn.addEventListener('click', () => {
        const mood = moodInput.value.trim();
        if (!mood) return;

        aiResult.classList.remove('hidden');
        aiResult.innerHTML = '<p>Thinking of the perfect chocolate for you...</p>';

        // Simulate AI processing
        setTimeout(() => {
            const recommendations = {
                happy: "Our Milk Chocolate Bar with almonds would complement your joyful mood perfectly!",
                sad: "Our Dark Chocolate Truffles with sea salt can help lift your spirits.",
                stressed: "Try our White Chocolate Raspberry for a calming, sweet escape.",
                excited: "Our Spicy Chili Dark Chocolate will match your energy!",
                tired: "Our Coffee Infused Dark Chocolate will give you a gentle boost.",
                romantic: "Our Heart-Shaped Assorted Chocolates are perfect for romance.",
                default: "Based on your mood, we recommend our best-selling Assorted Chocolate Box - something for every mood!"
            };

            const moodLower = mood.toLowerCase();
            let recommendation = recommendations.default;

            if (moodLower.includes('happy') || moodLower.includes('joy')) {
                recommendation = recommendations.happy;
            } else if (moodLower.includes('sad') || moodLower.includes('down')) {
                recommendation = recommendations.sad;
            } else if (moodLower.includes('stress') || moodLower.includes('anxious')) {
                recommendation = recommendations.stressed;
            } else if (moodLower.includes('excite') || moodLower.includes('energ')) {
                recommendation = recommendations.excited;
            } else if (moodLower.includes('tired') || moodLower.includes('exhaust')) {
                recommendation = recommendations.tired;
            } else if (moodLower.includes('romantic') || moodLower.includes('love')) {
                recommendation = recommendations.romantic;
            }

            aiResult.innerHTML = `
                <h4>We recommend:</h4>
                <p>${recommendation}</p>
                <a href="products.html" class="btn btn-secondary">Browse Recommendations</a>
            `;
        }, 1500);
    });
}

// Auth Form Toggle
if (showRegister && showLogin) {
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('inactive');
        registerForm.classList.add('active');
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.remove('active');
        loginForm.classList.remove('inactive');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadPopularProducts();

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.slide-up');
    animatedElements.forEach((el, index) => {
        el.classList.add(`delay-${index % 3 + 1}`);
    });
});