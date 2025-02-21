/* /* //fetch  the data from the server using a promise
fetch("http://localhost:5000/Books")
    .then(response => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err.messsage)) 

//introduce a timeout:
function fetchData(data){//simulate the fetching of data
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            console.log("Fetching data...");
            resolve(data);
        },1000)
    })
}

function execute(){fetch("http://localhost:5000/Books")  
    .then(response => response.json())  
    .then(bookData => fetchData(bookData))  
    .then(result => {  
        console.log(); 
    })  
    .catch(error => {  
        console.error("Error fetching data:", error);  
    })} execute()

    //using a callback function :
function getBookInfo(bookInfo, callbackFn) {
    setTimeout(() =>{
       console.log("Fetching all the book info from inventory....");
       fetch(bookInfo).then(response => response.json())
       .then(data => callbackFn(data))
       .catch(err => console.log(err.message));
    }, 2000)
  
}

function filteredBooks(books){
    const filteredBook = books.filter(book => book.genre === 'Fantasy')
    console.log(filteredBook);
    books.map((summaryOfBooks) => {
        console.log(`${summaryOfBooks.title} by ${summaryOfBooks.author} - ${summaryOfBooks.genre} (${summaryOfBooks.pages} pages)`); 
    })

   
}

getBookInfo('http://localhost:5000/Books', filteredBooks)  */
//filter data by genredocument.addEventListener('DOMContentLoaded', () => {
document.addEventListener('DOMContentLoaded', () => {
    const genreFilter = document.getElementById('genreFilter');
    const booksByGenre = document.getElementById('booksByGenre');
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceDisplay = document.getElementById('totalPrice');

    let cartCount = 0;
    let cart = [];
    let totalPrice = 0;

    fetch('http://localhost:5000/Books')
        .then(res => res.json())
        .then(data => {
            populateGenreOptions(data);
            displayBooksByGenre(data);

            genreFilter.addEventListener('change', () => displayBooksByGenre(data));
        })
        .catch(err => console.error('Error:', err));

    function populateGenreOptions(books) {
        const genres = [...new Set(books.map(book => book.genre))];
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreFilter.appendChild(option);
        });
    }

    function displayBooksByGenre(books) {
        const selectedGenre = genreFilter.value;
        const filteredBooks = selectedGenre === 'All' ? books : books.filter(book => book.genre === selectedGenre);

        booksByGenre.innerHTML = '';
        filteredBooks.forEach(book => createBookCard(book));
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

        booksByGenre.appendChild(bookDiv);
    }

    function addToCart(book) {
        const existingItem = cart.find(item => item.id === book.id);

        if (existingItem) {
            existingItem.count++;
        } else {
            cart.push({...book, count: 1 });
        }

        cartCount++;
        totalPrice += parseFloat(book.price);
        updateCartCount();
    }

    function updateCartCount() {
        cartDisplay.textContent = cartCount;
    }

    function renderCartModal() {
        cartItemsContainer.innerHTML = '';
        totalPrice = 0;

        cart.forEach(item => {
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

            totalPrice += item.price * item.count;
        });

        totalPriceDisplay.textContent = totalPrice.toFixed(2);
    }

    function increaseItemCount(item) {
        item.count++;
        cartCount++;
        totalPrice += parseFloat(item.price);
        updateCartCount();
        renderCartModal();
    }

    function decreaseItemCount(item) {
        if (item.count > 0) {
            item.count--;
            cartCount--;
            totalPrice -= parseFloat(item.price);

            if (item.count === 0) {
                removeItemFromCart(item);
            } else {
                updateCartCount();
                renderCartModal();
            }
        }
    }

    function removeItemFromCart(item) {
        const itemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

        if (itemIndex > -1) {
            cartCount -= cart[itemIndex].count;
            totalPrice -= cart[itemIndex].price * cart[itemIndex].count;
            cart.splice(itemIndex, 1);
        }

        updateCartCount();
        renderCartModal();
    }

    const modalLink = document.getElementById('modal-link');
    const modal = document.getElementById('myModal');
    const closeModal = modal.querySelector('.close');
    const cartDisplay = document.querySelector('.cart-count');

    modalLink.addEventListener('click', (event) => {
        event.preventDefault();
        renderCartModal();
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});


/* // Get the modal
let modal = document.getElementById("myModal");

let link = document.getElementById("modal-link"); // Get the button that opens the modal

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
link.onclick = function() {
        modal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    } //refernce=www.3schools.com */