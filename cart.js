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
        cartWindow.innerHTML = '<h2 class="text-2xl font-bold mb-4">Your Cart</h2>';
        if (Object.keys(cart).length === 0) {
            cartWindow.innerHTML += '<p>Your cart is empty.</p>';
            return;
        }
        const ul = document.createElement('ul');
        ul.classList.add('space-y-4');
        Object.values(cart).forEach(item => {
            const li = document.createElement('li');
            li.classList.add('flex', 'justify-between', 'items-center', 'bg-gray-800', 'p-3', 'rounded');
            li.innerHTML = `
                <div>
                    <h3 class="font-semibold">${item.name}</h3>
                    <p>Price: Rs ${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <button class="remove-item bg-red-600 px-2 py-1 rounded text-white" data-product="${item.id}">Remove</button>
            `;
            ul.appendChild(li);
        });
        cartWindow.appendChild(ul);

        // Add Buy Now button
        const buyNowBtn = document.createElement('button');
        buyNowBtn.textContent = 'Buy Now';
        buyNowBtn.classList.add('bg-red-600', 'text-white', 'px-4', 'py-2', 'rounded', 'mt-4', 'w-full');
        buyNowBtn.addEventListener('click', () => {
            alert('Thank you for your purchase!');
            cart = {};
            saveCart();
            updateCartCount();
            renderCart();
            cartWindow.classList.remove('active');
        });
        cartWindow.appendChild(buyNowBtn);

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

