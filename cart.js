document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.querySelector('.cart-btn');
    const cartCountElem = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Create cart window element
    let cartWindow = document.querySelector('.cart-window');
    if (!cartWindow) {
        cartWindow = document.createElement('div');
        cartWindow.classList.add('cart-window');
        document.body.appendChild(cartWindow);
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    function updateCartCount() {
        const count = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
        if (count > 0) {
            cartCountElem.textContent = count;
            cartCountElem.classList.remove('hidden');
        } else {
            cartCountElem.classList.add('hidden');
        }
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCart() {
        let cartContent = '';
        if (Object.keys(cart).length === 0) {
            cartContent = '<p>Your cart is empty.</p>';
        } else {
            const ul = document.createElement('ul');
            ul.classList.add('space-y-6');
            Object.values(cart).forEach(item => {
                const li = document.createElement('li');
                li.classList.add('flex', 'justify-between', 'items-center', 'bg-gray-900', 'p-4', 'rounded-lg', 'shadow-lg', 'hover:shadow-orange-500/50', 'transition-shadow');
                li.innerHTML = `
                    <div class="flex items-center space-x-4">
                        <img src="https://via.placeholder.com/60" alt="${item.name}" class="w-16 h-16 rounded object-cover shadow-md" />
                        <div>
                            <h3 class="font-semibold text-lg">${item.name}</h3>
                            <p class="text-orange-500 font-bold">Rs ${item.price}</p>
                            <p class="text-gray-400">Quantity: ${item.quantity}</p>
                        </div>
                    </div>
                    <button class="remove-item bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700 transition" data-product="${item.id}">Remove</button>
                `;
                ul.appendChild(li);
            });
            cartContent = ul.outerHTML;
        }

        cartWindow.innerHTML = `
            <div class="cart-header flex items-center mb-6">
                <a href="#home" class="back-arrow mr-4 cursor-pointer hover:text-orange-500 transition" title="Back to Home">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </a>
                <h2 class="text-3xl font-bold">Your Cart</h2>
            </div>
            ${cartContent}
            <button class="buy-now bg-orange-500 text-white px-5 py-3 rounded-lg mt-6 w-full font-semibold hover:bg-orange-600 transition">Buy Now</button>
        `;

        // Add event listener for back arrow to close cart (always add regardless of cart content)
        const backArrow = cartWindow.querySelector('.back-arrow');
        if (backArrow) {
            backArrow.addEventListener('click', (e) => {
                e.preventDefault();
                cartWindow.classList.remove('active');
            });
        }

        // Add event listener for buy now button
        const buyNowBtn = cartWindow.querySelector('.buy-now');
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', () => {
                alert('Thank you for your purchase!');
                cart = {};
                saveCart();
                updateCartCount();
                renderCart();
                cartWindow.classList.remove('active');
            });
        }

        // Add event listeners for remove buttons
        const removeButtons = cartWindow.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product');
                delete cart[productId];
                saveCart();
                updateCartCount();
                renderCart();
            });
        });
    }

    function addToCart(productId, name, price) {
        if (cart[productId]) {
            cart[productId].quantity += 1;
        } else {
            cart[productId] = { id: productId, name, price, quantity: 1 };
        }
        saveCart();
        updateCartCount();
        renderCart();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productId = button.getAttribute('data-product');
            const name = productCard.querySelector('h3').textContent;
            const priceText = productCard.querySelector('span.text-orange-500').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            addToCart(productId, name, price);
        });
    });

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartWindow.classList.toggle('active');
        });
    }

    // Close cart when clicking outside
    document.addEventListener('click', (event) => {
        if (cartWindow.classList.contains('active') && !cartWindow.contains(event.target) && !cartBtn.contains(event.target)) {
            cartWindow.classList.remove('active');
        }
    });

    updateCartCount();
    renderCart();
});


