const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve your frontend from /public

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test connection on startup
db.connect(err => {
    if (err) {
        console.error("❌ DB connection failed:", err.message);
        process.exit(1);
    }
    console.log("✅ Connected to the database.");
});

// API endpoint to get counter
app.get("/api/get-counter", (req, res) => {
    db.query("SELECT amount FROM counter WHERE id = 1", (err, results) => {
        if (err) {
            console.error("❌ DB query error:", err.message);
            return res.status(500).json({ error: "Database error" });
        }

        console.log("✅ Query results:", results);

        if (!results || results.length === 0) {
            return res.status(404).json({ error: "Counter not found" });
        }

        res.json({ amount: results[0].amount });
    });
});


// API endpoint to set counter
app.post("/api/set-counter", (req, res) => {
    const { password, value } = req.body;

    if (password !== process.env.INCREMENT_PASSWORD) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    db.query("UPDATE counter SET amount = ? WHERE id = 1", [value], (err) => {
        if (err) {
            console.error("❌ DB update error:", err.message);
            return res.status(500).json({ error: "Database error" });
        }

        res.json({ message: "Counter set", amount: value });
    });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
