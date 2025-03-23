import { setupAliases } from "import-aliases";
setupAliases()
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import tasksRoute from "./routes/tasksRoute";



// Load environment variables first
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:4200",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Routes 
app.use("/api/v1/tasks", tasksRoute); 




// Test route
app.get("/", (req, res) => {
    res.send("Hello, Welcome");
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on port: ${port}`);
});
