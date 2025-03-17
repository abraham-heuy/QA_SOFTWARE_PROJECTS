"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    const authModal = document.getElementById("authModal");
    const authModalLogin = document.getElementById("authModalLogin");
    const postBookModal = document.getElementById("postBookModal");
    const booksContainer = document.getElementById("booksContainer");
    const openAuthModal = document.getElementById("openAuthModal");
    const openLoginModal = document.getElementById("openLoginModal");
    const registerBtn = document.getElementById("registerBtn");
    const loginBtn = document.getElementById("loginBtn");
    const postBookBtn = document.getElementById("postBookBtn");
    let isAuthenticated = false;
    // Function to show a modal
    function showModal(modal) {
        if (modal)
            modal.style.display = "flex";
    }
    // Function to hide a modal
    function hideModal(modal) {
        if (modal)
            modal.style.display = "none";
    }
    // Open the registration modal
    openAuthModal === null || openAuthModal === void 0 ? void 0 : openAuthModal.addEventListener("click", () => showModal(authModal));
    // Open the login modal
    openLoginModal === null || openLoginModal === void 0 ? void 0 : openLoginModal.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        showModal(authModalLogin);
    });
    // Close modals when 'X' is clicked
    (_a = document.querySelectorAll(".close")) === null || _a === void 0 ? void 0 : _a.forEach((btn) => {
        btn.addEventListener("click", () => {
            hideModal(authModal);
            hideModal(authModalLogin);
            hideModal(postBookModal);
        });
    });
    // Register User
    registerBtn === null || registerBtn === void 0 ? void 0 : registerBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const name = (_a = document.getElementById("name")) === null || _a === void 0 ? void 0 : _a.value;
        const email = (_b = document.getElementById("email")) === null || _b === void 0 ? void 0 : _b.value;
        const password = (_c = document.getElementById("password")) === null || _c === void 0 ? void 0 : _c.value;
        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }
        try {
            const response = yield fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = yield response.json();
            if (response.ok) {
                alert("Registration successful! You can now post books.");
                localStorage.setItem("user_id", data.user_id.toString());
                isAuthenticated = true;
                hideModal(authModal);
                showModal(postBookModal);
            }
            else {
                alert("Registration failed! Try again.");
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    }));
    // Login User
    loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const email = (_a = document.getElementById("loginEmail")) === null || _a === void 0 ? void 0 : _a.value;
        const password = (_b = document.getElementById("loginPassword")) === null || _b === void 0 ? void 0 : _b.value;
        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }
        try {
            const response = yield fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = yield response.json();
            if (response.ok) {
                alert("Login successful!");
                localStorage.setItem("user_id", data.user_id.toString());
                isAuthenticated = true;
                hideModal(authModalLogin);
                showModal(postBookModal);
            }
            else {
                alert("Invalid credentials!");
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    }));
    // Post Book
    postBookBtn === null || postBookBtn === void 0 ? void 0 : postBookBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!isAuthenticated) {
            alert("Please login or register first.");
            return;
        }
        const user_id = parseInt(localStorage.getItem("user_id") || "0", 10);
        if (!user_id) {
            alert("User ID not found. Please login again.");
            return;
        }
        const bookTitle = (_a = document.getElementById("bookTitle")) === null || _a === void 0 ? void 0 : _a.value;
        const author = (_b = document.getElementById("author")) === null || _b === void 0 ? void 0 : _b.value;
        const genre = (_c = document.getElementById("genre")) === null || _c === void 0 ? void 0 : _c.value;
        const year = parseInt(((_d = document.getElementById("year")) === null || _d === void 0 ? void 0 : _d.value) || "0", 10);
        const pages = parseInt(((_e = document.getElementById("pages")) === null || _e === void 0 ? void 0 : _e.value) || "0", 10);
        const publisher = (_f = document.getElementById("publisher")) === null || _f === void 0 ? void 0 : _f.value;
        const description = (_g = document.getElementById("description")) === null || _g === void 0 ? void 0 : _g.value;
        const price = parseFloat(((_h = document.getElementById("price")) === null || _h === void 0 ? void 0 : _h.value) || "0");
        if (!bookTitle || !author || !description || isNaN(price)) {
            alert("Please fill all required fields");
            return;
        }
        const bookData = {
            title: bookTitle,
            author,
            genre,
            year,
            pages,
            publisher,
            description,
            price,
            user_id,
        };
        try {
            const response = yield fetch("http://localhost:3000/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookData),
            });
            if (response.ok) {
                alert("Book Posted Successfully!");
                hideModal(postBookModal);
                fetchBooks();
            }
            else {
                alert("Failed to post book");
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    }));
    // Fetch and Display Books
    function fetchBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("http://localhost:3000/api/books");
                const books = yield response.json();
                if (!booksContainer)
                    return;
                booksContainer.innerHTML = "";
                books.forEach((book) => {
                    const formattedDate = book.created_at
                        ? new Date(book.created_at).toLocaleDateString()
                        : "Unknown date";
                    // Add `data-id` to store book ID
                    const bookElement = document.createElement("div");
                    bookElement.classList.add("book");
                    bookElement.setAttribute("data-id", book.id.toString()); // Store book ID
                    bookElement.innerHTML = `
                    <button class="delete-button">❌</button> 
                    <h3>${book.title}</h3>
                    <p>✍ by ${book.author}</p>
                    <p>📖 Genre: ${book.genre}</p>
                    <p>📅 Year: ${book.year}</p>
                    <p>📜 Pages: ${book.pages}</p>
                    <p>🏢 Publisher: ${book.publisher}</p>
                    <p>📜 ${book.description}</p>
                    <p>💰 Price: Ksh ${book.price}</p>
                    <p><strong>👤 Posted by:</strong> ${book.posted_by}</p>
                `;
                    booksContainer.appendChild(bookElement);
                });
                // Add event listener to delete buttons
                document.querySelectorAll(".delete-button").forEach((button) => {
                    button.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
                        const target = event.target;
                        const bookDiv = target.closest(".book"); // Get the book container
                        if (bookDiv) {
                            const bookId = bookDiv.getAttribute("data-id"); // Retrieve book ID
                            if (!bookId) {
                                console.error("Book ID not found.");
                                return;
                            }
                            const confirmed = confirm("Are you sure you want to delete this book?");
                            if (confirmed) {
                                try {
                                    const deleteResponse = yield fetch("http://localhost:3000/api/books/delete", {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({ id: bookId }), // Send ID in the request body
                                    });
                                    if (deleteResponse.ok) {
                                        bookDiv.remove(); // Remove book from UI after successful deletion
                                        alert("Book deleted successfully!");
                                    }
                                    else {
                                        const errorData = yield deleteResponse.json();
                                        alert(`Failed to delete the book: ${errorData.error}`);
                                    }
                                }
                                catch (error) {
                                    console.error("Error deleting the book:", error);
                                }
                            }
                        }
                    }));
                });
            }
            catch (error) {
                console.error("Error loading books:", error);
            }
        });
    }
    fetchBooks();
    fetchBooks();
});
//# sourceMappingURL=index.js.map