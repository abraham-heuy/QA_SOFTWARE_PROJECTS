document.addEventListener('DOMContentLoaded', () => {
    const genreFilter = document.getElementById('genreFilter') as HTMLSelectElement;
    const booksByGenre = document.getElementById('booksByGenre') as HTMLDivElement;
    const cartItemsContainer = document.getElementById('cartItems') as HTMLDivElement;
    const totalPriceDisplay = document.getElementById('totalPrice') as HTMLSpanElement;
    const cartDisplay = document.querySelector('.cart-count') as HTMLSpanElement;

    let cartCount: number = 0;
    let totalPrice: number = 0;
    type BookInventory = {
        id: number;
        title: string;
        author: string;
        genre: string;
        pages: string;
        publisher: string;
        description: string;
        image: string;
        price: number;
        count?: number; 
    };

    let cart: BookInventory[] = [];

    fetch('http://localhost:5000/Books')
        .then((res) => res.json())
        .then((data: BookInventory[]) => {
            populateGenreOptions(data);
            displayBooksByGenre(data);

            genreFilter?.addEventListener('change', () => displayBooksByGenre(data));
        })
        .catch((err) => console.error('Error:', err));

    function populateGenreOptions(books: BookInventory[]) {
        const genres = [...new Set(books.map((book) => book.genre))];

        genres.forEach((genre) => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreFilter?.appendChild(option);
        });
    }

    function displayBooksByGenre(books: BookInventory[]) {
        if (!booksByGenre) return;
        const selectedGenre = genreFilter?.value || 'All';
        const filteredBooks = selectedGenre === 'All' ? books : books.filter((book) => book.genre === selectedGenre);

        booksByGenre.innerHTML = '';
        filteredBooks.forEach((book) => createBookCard(book));
    }

    function createBookCard(book: BookInventory) {
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

        const buyButton = bookDiv.querySelector('.buy1button') as HTMLButtonElement;
        buyButton.addEventListener('click', () => addToCart(book));

        booksByGenre?.appendChild(bookDiv);
    }

    function addToCart(book: BookInventory) {
        const existingItem = cart.find((item) => item.id === book.id);

        if (existingItem) {
            existingItem.count!++;
        } else {
            cart.push({ ...book, count: 1 });
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
        if (!cartItemsContainer || !totalPriceDisplay) return;

        cartItemsContainer.innerHTML = '';
        totalPrice = 0;

        cart.forEach((item) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p><strong>${item.title}</strong> - Ksh ${item.price} x <span class="item-count">${item.count}</span></p>
                <button class="decrease-btn">-</button>
                <button class="increase-btn">+</button>
                <button class="remove-btn">Remove</button>
            `;

            const decreaseBtn = itemDiv.querySelector('.decrease-btn') as HTMLButtonElement;
            const increaseBtn = itemDiv.querySelector('.increase-btn') as HTMLButtonElement;
            const removeBtn = itemDiv.querySelector('.remove-btn') as HTMLButtonElement;

            decreaseBtn.addEventListener('click', () => decreaseItemCount(item));
            increaseBtn.addEventListener('click', () => increaseItemCount(item));
            removeBtn.addEventListener('click', () => removeItemFromCart(item));

            cartItemsContainer.appendChild(itemDiv);

            totalPrice += item.price * (item.count ?? 1);
        });

        totalPriceDisplay.textContent = totalPrice.toFixed(2);
    }

    function increaseItemCount(item: BookInventory) {
        item.count!++;
        cartCount++;
        totalPrice += item.price;
        updateCartCount();
        renderCartModal();
    }

    function decreaseItemCount(item: BookInventory) {
        if (item.count && item.count > 0) {
            item.count--;
            cartCount--;
            totalPrice -= item.price;

            if (item.count === 0) {
                removeItemFromCart(item);
            } else {
                updateCartCount();
                renderCartModal();
            }
        }
    }

    function removeItemFromCart(item: BookInventory) {
        const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

        if (itemIndex > -1) {
            cartCount -= cart[itemIndex].count ?? 0;
            totalPrice -= cart[itemIndex].price * (cart[itemIndex].count ?? 1);
            cart.splice(itemIndex, 1);
        }

        updateCartCount();
        renderCartModal();
    }

    // Modal handling
    const modalLink = document.getElementById('modal-link') as HTMLAnchorElement | null;
    const modal = document.getElementById('myModal') as HTMLDivElement | null;
    const closeModal = modal?.querySelector('.close') as HTMLSpanElement | null;

    modalLink?.addEventListener('click', (event) => {
        event.preventDefault();
        renderCartModal();
        if (modal) modal.style.display = 'block';
    });

    closeModal?.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            if (modal) modal.style.display = 'none';
        }
    });
});

