"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const genreFilter = document.getElementById('genreFilter');
    const booksByGenre = document.getElementById('booksByGenre');
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceDisplay = document.getElementById('totalPrice');
    const cartDisplay = document.querySelector('.cart-count');
    let cartCount = 0;
    let totalPrice = 0;
    let cart = [];
    fetch('http://localhost:5000/Books')
        .then((res) => res.json())
        .then((data) => {
        populateGenreOptions(data);
        displayBooksByGenre(data);
        genreFilter === null || genreFilter === void 0 ? void 0 : genreFilter.addEventListener('change', () => displayBooksByGenre(data));
    })
        .catch((err) => console.error('Error:', err));
    function populateGenreOptions(books) {
        const genres = [...new Set(books.map((book) => book.genre))];
        genres.forEach((genre) => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreFilter === null || genreFilter === void 0 ? void 0 : genreFilter.appendChild(option);
        });
    }
    function displayBooksByGenre(books) {
        if (!booksByGenre)
            return;
        const selectedGenre = (genreFilter === null || genreFilter === void 0 ? void 0 : genreFilter.value) || 'All';
        const filteredBooks = selectedGenre === 'All' ? books : books.filter((book) => book.genre === selectedGenre);
        booksByGenre.innerHTML = '';
        filteredBooks.forEach((book) => createBookCard(book));
    }
    function createBookCard(book) {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-card');
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Publisher:</strong> ${book.publisher}</p>
            <p>${book.description}</p>
            <p><strong>Price:</strong> Ksh ${book.price}</p>
            <button class="buy1button">Buy Now</button>
        `;
        const buyButton = bookDiv.querySelector('.buy1button');
        buyButton.addEventListener('click', () => addToCart(book));
        booksByGenre === null || booksByGenre === void 0 ? void 0 : booksByGenre.appendChild(bookDiv);
    }
    function addToCart(book) {
        const existingItem = cart.find((item) => item.id === book.id);
        if (existingItem) {
            existingItem.count++;
        }
        else {
            cart.push(Object.assign(Object.assign({}, book), { count: 1 }));
        }
        cartCount++;
        totalPrice += book.price;
        updateCartCount();
    }
    function updateCartCount() {
        if (cartDisplay) {
            cartDisplay.textContent = cartCount.toString();
        }
    }
    function renderCartModal() {
        if (!cartItemsContainer || !totalPriceDisplay)
            return;
        cartItemsContainer.innerHTML = '';
        totalPrice = 0;
        cart.forEach((item) => {
            var _a;
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p><strong>${item.title}</strong> - Ksh ${item.price} x <span class="item-count">${item.count}</span></p>
                <button class="decrease-btn">-</button>
                <button class="increase-btn">+</button>
                <button class="remove-btn">Remove</button>
            `;
            const decreaseBtn = itemDiv.querySelector('.decrease-btn');
            const increaseBtn = itemDiv.querySelector('.increase-btn');
            const removeBtn = itemDiv.querySelector('.remove-btn');
            decreaseBtn.addEventListener('click', () => decreaseItemCount(item));
            increaseBtn.addEventListener('click', () => increaseItemCount(item));
            removeBtn.addEventListener('click', () => removeItemFromCart(item));
            cartItemsContainer.appendChild(itemDiv);
            totalPrice += item.price * ((_a = item.count) !== null && _a !== void 0 ? _a : 1);
        });
        totalPriceDisplay.textContent = totalPrice.toFixed(2);
    }
    function increaseItemCount(item) {
        item.count++;
        cartCount++;
        totalPrice += item.price;
        updateCartCount();
        renderCartModal();
    }
    function decreaseItemCount(item) {
        if (item.count && item.count > 0) {
            item.count--;
            cartCount--;
            totalPrice -= item.price;
            if (item.count === 0) {
                removeItemFromCart(item);
            }
            else {
                updateCartCount();
                renderCartModal();
            }
        }
    }
    function removeItemFromCart(item) {
        var _a, _b;
        const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
        if (itemIndex > -1) {
            cartCount -= (_a = cart[itemIndex].count) !== null && _a !== void 0 ? _a : 0;
            totalPrice -= cart[itemIndex].price * ((_b = cart[itemIndex].count) !== null && _b !== void 0 ? _b : 1);
            cart.splice(itemIndex, 1);
        }
        updateCartCount();
        renderCartModal();
    }
    // Modal handling
    const modalLink = document.getElementById('modal-link');
    const modal = document.getElementById('myModal');
    const closeModal = modal === null || modal === void 0 ? void 0 : modal.querySelector('.close');
    modalLink === null || modalLink === void 0 ? void 0 : modalLink.addEventListener('click', (event) => {
        event.preventDefault();
        renderCartModal();
        if (modal)
            modal.style.display = 'block';
    });
    closeModal === null || closeModal === void 0 ? void 0 : closeModal.addEventListener('click', () => {
        if (modal)
            modal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            if (modal)
                modal.style.display = 'none';
        }
    });
});
//# sourceMappingURL=index.js.map