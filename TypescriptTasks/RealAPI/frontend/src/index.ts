document.addEventListener("DOMContentLoaded", () => {
    const authModal = document.getElementById("authModal") as HTMLElement | null;
    const authModalLogin = document.getElementById(
        "authModalLogin"
    ) as HTMLElement | null;
    const postBookModal = document.getElementById(
        "postBookModal"
    ) as HTMLElement | null;
    const booksContainer = document.getElementById(
        "booksContainer"
    ) as HTMLElement | null;

    const openAuthModal = document.getElementById(
        "openAuthModal"
    ) as HTMLElement | null;
    const openLoginModal = document.getElementById(
        "openLoginModal"
    ) as HTMLElement | null;
    const registerBtn = document.getElementById(
        "registerBtn"
    ) as HTMLElement | null;
    const loginBtn = document.getElementById("loginBtn") as HTMLElement | null;
    const postBookBtn = document.getElementById(
        "postBookBtn"
    ) as HTMLElement | null;

    let isAuthenticated = false;

    // Function to show a modal
    function showModal(modal: HTMLElement | null) {
        if (modal) modal.style.display = "flex";
    }

    // Function to hide a modal
    function hideModal(modal: HTMLElement | null) {
        if (modal) modal.style.display = "none";
    }

    // Open the registration modal
    openAuthModal?.addEventListener("click", () => showModal(authModal));

    // Open the login modal
    openLoginModal?.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        showModal(authModalLogin);
    });

    // Close modals when 'X' is clicked
    document.querySelectorAll(".close")?.forEach((btn) => {
        btn.addEventListener("click", () => {
            hideModal(authModal);
            hideModal(authModalLogin);
            hideModal(postBookModal);
        });
    });

    // Register User
    registerBtn?.addEventListener("click", async () => {
        const name = (document.getElementById("name") as HTMLInputElement)?.value;
        const email = (document.getElementById("email") as HTMLInputElement)?.value;
        const password = (document.getElementById("password") as HTMLInputElement)
            ?.value;

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful! You can now post books.");
                localStorage.setItem("user_id", data.user_id.toString());
                isAuthenticated = true;
                hideModal(authModal);
                showModal(postBookModal);
            } else {
                alert("Registration failed! Try again.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    // Login User
    loginBtn?.addEventListener("click", async () => {
        const email = (document.getElementById("loginEmail") as HTMLInputElement)
            ?.value;
        const password = (
            document.getElementById("loginPassword") as HTMLInputElement
        )?.value;

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!");
                localStorage.setItem("user_id", data.user_id.toString());
                isAuthenticated = true;
                hideModal(authModalLogin);
                showModal(postBookModal);
            } else {
                alert("Invalid credentials!");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    // Post Book
    postBookBtn?.addEventListener("click", async () => {
        if (!isAuthenticated) {
            alert("Please login or register first.");
            return;
        }

        const user_id = parseInt(localStorage.getItem("user_id") || "0", 10);
        if (!user_id) {
            alert("User ID not found. Please login again.");
            return;
        }

        const bookTitle = (document.getElementById("bookTitle") as HTMLInputElement)
            ?.value;
        const author = (document.getElementById("author") as HTMLInputElement)
            ?.value;
        const genre = (document.getElementById("genre") as HTMLInputElement)?.value;
        const year = parseInt(
            (document.getElementById("year") as HTMLInputElement)?.value || "0",
            10
        );
        const pages = parseInt(
            (document.getElementById("pages") as HTMLInputElement)?.value || "0",
            10
        );
        const publisher = (document.getElementById("publisher") as HTMLInputElement)
            ?.value;
        const description = (
            document.getElementById("description") as HTMLTextAreaElement
        )?.value;
        const price = parseFloat(
            (document.getElementById("price") as HTMLInputElement)?.value || "0"
        );

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
            const response = await fetch("http://localhost:3000/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookData),
            });

            if (response.ok) {
                alert("Book Posted Successfully!");
                hideModal(postBookModal);
                fetchBooks();
            } else {
                alert("Failed to post book");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    interface Book {
        id: number;
        title: string;
        author: string;
        genre: string;
        year: number;
        pages: number;
        publisher: string;
        description: string;
        price: number;
        posted_by: string;
        created_at: string;
    }

    // Fetch and Display Books
    async function fetchBooks() {
        try {
            const response = await fetch("http://localhost:3000/api/books");
            const books: Book[] = await response.json();
    
            if (!booksContainer) return;
            booksContainer.innerHTML = "";
    
            books.forEach((book: Book) => {
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
    button.addEventListener("click", async (event) => {
        const target = event.target as HTMLElement;
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
                    const deleteResponse = await fetch("http://localhost:3000/api/books/delete", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: bookId }), // Send ID in the request body
                    });

                    if (deleteResponse.ok) {
                        bookDiv.remove(); // Remove book from UI after successful deletion
                        alert("Book deleted successfully!");
                    } else {
                        const errorData = await deleteResponse.json();
                        alert(`Failed to delete the book: ${errorData.error}`);
                    }
                } catch (error) {
                    console.error("Error deleting the book:", error);
                }
            }
        }
    });
});

    
        } catch (error) {
            console.error("Error loading books:", error);
        }
    }
    
    fetchBooks();
    

    fetchBooks();
});
