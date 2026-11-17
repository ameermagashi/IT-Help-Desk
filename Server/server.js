// The main file of our backend
// Made with AI assistance (Claude)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const app = express();

app.use(cors());         // lets our React app talk to this server
app.use(express.json()); // lets the server understand JSON data

// Test 1: is the server awake?
app.get("/", (req, res) => {
  res.send("Help Desk server is running! 🚀");
});

// Test 2: can the server talk to MySQL?
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM users");
    res.json({ message: "MySQL is connected!", users: rows[0].total });
  } catch (error) {
    res.status(500).json({ message: "MySQL problem", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});