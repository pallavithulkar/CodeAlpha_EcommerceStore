// DOM Elements
const productGrid = document.querySelector('.product-grid');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');

// Load all products
function loadProducts() {
    if (!productGrid) return;

    // In a real app, this would come from an API
    const products = [
        {
            id: 1,
            name: "Dark Chocolate Truffles",
            price: 12.99,
            image: "images/dark-truffles.jpg",
            category: "dark",
            rating: 4.5,
            description: "Rich 70% dark chocolate ganache enrobed in premium dark chocolate."
        },
        {
            id: 2,
            name: "Milk Chocolate Bar",
            price: 8.99,
            image: "images/milk-chocolate.jpg",
            category: "milk",
            rating: 4.2,
            description: "Creamy milk chocolate made with the finest cocoa beans."
        },
        {
            id: 3,
            name: "White Chocolate Raspberry",
            price: 10.99,
            image: "images/white-raspberry.jpg",
            category: "white",
            rating: 4.7,
            description: "Luxurious white chocolate with tangy raspberry filling."
        },
        {
            id: 4,
            name: "Assorted Chocolate Box",
            price: 24.99,
            image: "images/assorted-box.jpg",
            category: "gift",
            rating: 4.8,
            description: "An exquisite selection of our finest chocolates in a beautiful gift box."
        },
        {
            id: 5,
            name: "Dark Chocolate Sea Salt",
            price: 9.99,
            image: "images/dark-sea-salt.jpg",
            category: "dark",
            rating: 4.6,
            description: "72% dark chocolate with a sprinkle of Himalayan sea salt."
        },
        {
            id: 6,
            name: "Milk Chocolate Hazelnut",
            price: 11.99,
            image: "images/milk-hazelnut.jpg",
            category: "milk",
            rating: 4.4,
            description: "Creamy milk chocolate with crunchy roasted hazelnuts."
        },
        {
            id: 7,
            name: "White Chocolate Coconut",
            price: 10.99,
            image: "images/white-coconut.jpg",
            category: "white",
            rating: 4.3,
            description: "Smooth white chocolate with flakes of tropical coconut."
        },
        {
            id: 8,
            name: "Chocolate Sampler Pack",
            price: 19.99,
            image: "images/park.jpg",
            category: "gift",
            rating: 4.7,
            description: "A perfect introduction to our chocolate collection with various flavors."
        }
    ];

    renderProducts(products);

    // Add event listeners to filters
    if (categoryFilter && priceFilter) {
        categoryFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);
    }

    // Check if we're on a product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        loadProductDetail();
    }
}

function renderProducts(products) {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </a>
            <div class="product-info">
                <h3 class="product-title"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
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

function filterProducts() {
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;

    // In a real app, this would be an API call with filters
    const allProducts = [
        {
            id: 1,
            name: "Dark Chocolate Truffles",
            price: 12.99,
            image: "images/dark-truffles.jpg",
            category: "dark",
            rating: 4.5
        },
        {
            id: 2,
            name: "Milk Chocolate Bar",
            price: 8.99,
            image: "images/milk-chocolate.jpg",
            category: "milk",
            rating: 4.2
        },
        {
            id: 3,
            name: "White Chocolate Raspberry",
            price: 10.99,
            image: "images/white-raspberry.jpg",
            category: "white",
            rating: 4.7
        },
        {
            id: 4,
            name: "Assorted Chocolate Box",
            price: 24.99,
            image: "images/assorted-box.jpg",
            category: "gift",
            rating: 4.8
        },
        {
            id: 5,
            name: "Dark Chocolate Sea Salt",
            price: 9.99,
            image: "images/dark-sea-salt.jpg",
            category: "dark",
            rating: 4.6
        },
        {
            id: 6,
            name: "Milk Chocolate Hazelnut",
            price: 11.99,
            image: "images/milk-hazelnut.jpg",
            category: "milk",
            rating: 4.4
        },
        {
            id: 7,
            name: "White Chocolate Coconut",
            price: 10.99,
            image: "images/white-coconut.jpg",
            category: "white",
            rating: 4.3
        },
        {
            id: 8,
            name: "Chocolate Sampler Pack",
            price: 19.99,
            image: "images/park.jpg",
            category: "gift",
            rating: 4.7
        }
    ];

    let filteredProducts = [...allProducts];

    // Apply category filter
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    // Apply price filter
    if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (priceRange.endsWith('+')) {
            filteredProducts = filteredProducts.filter(product => product.price >= 50);
        } else {
            filteredProducts = filteredProducts.filter(product => product.price >= min && product.price <= max);
        }
    }

    renderProducts(filteredProducts);
}

function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        window.location.href = 'products.html';
        return;
    }

    // In a real app, this would come from an API
    const products = {
        1: {
            id: 1,
            name: "Dark Chocolate Truffles",
            price: 12.99,
            images: ["images/dark-truffles.jpg", "images/dark-truffles-2.jpg", "images/dark-truffles-3.jpg"],
            category: "dark",
            rating: 4.5,
            description: "Rich 70% dark chocolate ganache enrobed in premium dark chocolate. Each truffle is handcrafted by our master chocolatiers using only the finest cocoa beans sourced from sustainable farms in South America.",
            details: [
                "Weight: 250g",
                "Ingredients: Cocoa mass, sugar, cocoa butter, vanilla, cream",
                "Allergens: Contains milk, may contain traces of nuts",
                "Storage: Keep in a cool, dry place (18-20°C)"
            ],
            pairings: "Pairs wonderfully with red wine, coffee, or as a standalone treat after dinner."
        },
        2: {
            id: 2,
            name: "Milk Chocolate Bar",
            price: 8.99,
            images: ["images/milk-chocolate.jpg"],
            category: "milk",
            rating: 4.2,
            description: "Creamy milk chocolate made with the finest cocoa beans.",
            details: [
                "Weight: 100g",
                "Ingredients: Cocoa butter, sugar, milk powder, vanilla",
                "Allergens: Contains milk",
                "Storage: Keep in a cool, dry place"
            ],
            pairings: "Perfect with a glass of cold milk or as a snack."
        },
        3: {
            id: 3,
            name: "White Chocolate Raspberry",
            price: 10.99,
            images: ["images/white-raspberry.jpg"],
            category: "white",
            rating: 4.7,
            description: "Luxurious white chocolate with tangy raspberry filling.",
            details: [
                "Weight: 150g",
                "Ingredients: Cocoa butter, sugar, milk powder, raspberry puree",
                "Allergens: Contains milk",
                "Storage: Keep refrigerated"
            ],
            pairings: "Great with champagne or tea."
        },
        4: {
            id: 4,
            name: "Assorted Chocolate Box",
            price: 24.99,
            images: ["images/assorted-box.jpg"],
            category: "gift",
            rating: 4.8,
            description: "An exquisite selection of our finest chocolates in a beautiful gift box.",
            details: [
                "Weight: 500g",
                "Contains: 25 pieces of assorted chocolates",
                "Allergens: Contains milk, nuts",
                "Storage: Keep in a cool, dry place"
            ],
            pairings: "Ideal for gifting and special occasions."
        },
        5: {
            id: 5,
            name: "Dark Chocolate Sea Salt",
            price: 9.99,
            images: ["images/dark-sea-salt.jpg"],
            category: "dark",
            rating: 4.6,
            description: "72% dark chocolate with a sprinkle of Himalayan sea salt.",
            details: [
                "Weight: 100g",
                "Ingredients: Cocoa mass, sugar, cocoa butter, sea salt",
                "Allergens: May contain traces of nuts",
                "Storage: Keep in a cool, dry place"
            ],
            pairings: "Pairs well with whiskey or bourbon."
        },
        6: {
            id: 6,
            name: "Milk Chocolate Hazelnut",
            price: 11.99,
            images: ["images/milk-hazelnut.jpg"],
            category: "milk",
            rating: 4.4,
            description: "Creamy milk chocolate with crunchy roasted hazelnuts.",
            details: [
                "Weight: 120g",
                "Ingredients: Cocoa butter, sugar, milk powder, hazelnuts",
                "Allergens: Contains milk, nuts",
                "Storage: Keep in a cool, dry place"
            ],
            pairings: "Delicious with coffee."
        },
        7: {
            id: 7,
            name: "White Chocolate Coconut",
            price: 10.99,
            images: ["images/white-coconut.jpg"],
            category: "white",
            rating: 4.3,
            description: "Smooth white chocolate with flakes of tropical coconut.",
            details: [
                "Weight: 150g",
                "Ingredients: Cocoa butter, sugar, milk powder, coconut flakes",
                "Allergens: Contains milk",
                "Storage: Keep in a cool, dry place"
            ],
            pairings: "Perfect with piña colada or tropical drinks."
        },
        8: {
            id: 8,
            name: "Chocolate Sampler Pack",
            price: 19.99,
            images: ["images/park.jpg"],
            category: "gift",
            rating: 4.7,
            description: "A perfect introduction to our chocolate collection with various flavors.",
            details: [
                "Weight: 300g",
                "Contains: 15 pieces of assorted chocolates",
                "Allergens: Contains milk, may contain nuts",
                "Storage: Keep in a cool, dry place"
            ],
            pairings: "Great for tasting parties."
        }
    };

    const product = products[productId];
    if (!product) {
        window.location.href = 'products.html';
        return;
    }

    // Set product details
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-description').textContent = product.description;

    // Set main image
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = product.images[0];
    mainImage.alt = product.name;

    // Set thumbnails
    const thumbnailContainer = document.querySelector('.thumbnail-images');
    thumbnailContainer.innerHTML = product.images.map((image, index) => `
        <div class="thumbnail" data-index="${index}">
            <img src="${image}" alt="${product.name} thumbnail ${index + 1}">
        </div>
    `).join('');

    // Add click event to thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', () => {
            const index = thumb.getAttribute('data-index');
            mainImage.src = product.images[index];
        });
    });

    // Set product details list
    const detailsList = document.getElementById('product-details-list');
    detailsList.innerHTML = product.details.map(detail => `<li>${detail}</li>`).join('');

    // Set AI pairing suggestion
    document.getElementById('ai-pairing-text').textContent = product.pairings;

    // Set up quantity selector
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');

    minusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });

    // Set up add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        addToCart(product.id, quantity);
    });

    // Load related products
    loadRelatedProducts(product.category, product.id);
}

function loadRelatedProducts(category, excludeId) {
    const relatedProducts = [
        {
            id: 5,
            name: "Dark Chocolate Sea Salt",
            price: 9.99,
            image: "images/dark-sea-salt.jpg",
            category: "dark",
            rating: 4.6
        },
        {
            id: 6,
            name: "Milk Chocolate Hazelnut",
            price: 11.99,
            image: "images/milk-hazelnut.jpg",
            category: "milk",
            rating: 4.4
        },
        {
            id: 7,
            name: "White Chocolate Coconut",
            price: 10.99,
            image: "images/white-coconut.jpg",
            category: "white",
            rating: 4.3
        },
        {
            id: 8,
            name: "Chocolate Sampler Pack",
            price: 19.99,
            image: "images/park.jpg",
            category: "gift",
            rating: 4.7
        }
    ].filter(p => p.category === category && p.id !== excludeId).slice(0, 4);

    const relatedGrid = document.querySelector('.related-products .product-grid');
    if (!relatedGrid) return;

    relatedGrid.innerHTML = relatedProducts.map(product => `
        <div class="product-card">
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </a>
            <div class="product-info">
                <h3 class="product-title"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.related-products .add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function addToCart(productId, quantity = 1) {
    // All product details for cart functionality
    const products = {
        1: { name: "Dark Chocolate Truffles", price: 12.99, image: "images/dark-truffles.jpg" },
        2: { name: "Milk Chocolate Bar", price: 8.99, image: "images/milk-chocolate.jpg" },
        3: { name: "White Chocolate Raspberry", price: 10.99, image: "images/white-raspberry.jpg" },
        4: { name: "Assorted Chocolate Box", price: 24.99, image: "images/assorted-box.jpg" },
        5: { name: "Dark Chocolate Sea Salt", price: 9.99, image: "images/dark-sea-salt.jpg" },
        6: { name: "Milk Chocolate Hazelnut", price: 11.99, image: "images/milk-hazelnut.jpg" },
        7: { name: "White Chocolate Coconut", price: 10.99, image: "images/white-coconut.jpg" },
        8: { name: "Chocolate Sampler Pack", price: 19.99, image: "images/park.jpg" }
    };

    const product = products[productId];
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Show notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${product.name} added to cart!`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
});