import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db/db";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173", // Allow frontend connection
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Test route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Welcome to the Book Posting API!");
});

//Create User
app.post("/api/register", async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
            [name, email, password]
        );

        const user_id = result.rows[0].id; // Get the generated user ID

        res.status(201).json({ message: "User registered successfully", user_id });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// Login User
app.post("/api/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }

        // Fetch the user from the database
        const result = await pool.query(
            "SELECT id FROM users WHERE email = $1 AND password = $2",
            [email, password]
        );

        if (result.rows.length === 0) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        const user_id = result.rows[0].id;

        res.status(200).json({ message: "Login successful", user_id });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Post a Book
app.post("/api/books", async (req: Request, res: Response) => {
    try {
        const { title, author, genre, year, pages, publisher, description, price, user_id } = req.body;

        if (!title || !author || !description || !price || !user_id) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const parsedUserId = parseInt(user_id, 10); // Convert to integer
        if (isNaN(parsedUserId)) {
            res.status(400).json({ message: "Invalid user_id format" });
            return;
        }

        const bookResult = await pool.query(
            "INSERT INTO bookposts (title, author, genre, year, pages, publisher, description, price, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [title, author, genre, year, pages, publisher, description, price, parsedUserId]
        );

        res.status(201).json({
            message: "Book successfully posted",
            book: bookResult.rows[0],
        });
    } catch (error) {
        console.error("Error posting book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.patch("/api/books/update", async (req: Request, res: Response) => {
    const { title, author, genre, year, pages, publisher, description, price, id } = req.body;

    try {
        // Validate input
        if (!id) {
            res.status(400).json({ message: "Book ID is required!" });
            return 
        }

        const query = `
            UPDATE bookposts SET  
                title = $1,  
                author = $2,  
                genre = $3,  
                year = $4,  
                pages = $5,  
                publisher = $6,  
                description = $7,  
                price = $8  
            WHERE id = $9  
            RETURNING *;
        `;

        const values = [title, author, genre, year, pages, publisher, description, price];

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            res.status(404).json({ error: "Book not found!" });
            return 
        }
        res.status(200).json({ message: "Book updated successfully!", book: result.rows[0] });
        return

    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return 
    }
});

//Delete funnctionality from the postgres:
app.delete("/api/books/delete", async (req, res) => {  
    const { id } = req.body;   
  
    if (!id) {
        res.status(400).json({ error: "Book ID is required" });   
        return  
    }  
  
    try {  
      const result = await pool.query('DELETE FROM bookposts WHERE id = $1 RETURNING *', [id]);  
      
      // Check if any rows were deleted  
      if (result.rowCount === 0) { 
        res.status(404).json({ error: "Book not found" });   
        return 
      }  
  
      res.status(200).json({ message: "Book deleted successfully", deletedBook: result.rows[0] });  
    } catch (error) {  
      console.error(error); // Log the error for debugging  
      res.status(500).json({ error: "Internal Server Error" });  
    }  
  });  

//Get All Books 
app.get("/api/books", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT b.id, b.title, b.author, b.genre, b.year, b.pages, 
                   b.publisher, b.description, b.price, u.name AS posted_by, 
                   TO_CHAR(b.created_at, 'YYYY-MM-DD HH24:MI') AS formatted_date
            FROM bookposts b
            JOIN users u ON b.user_id = u.id
            ORDER BY b.created_at DESC
        `);

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Failed to fetch books" });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
