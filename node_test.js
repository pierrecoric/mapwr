const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect and query the counter table
db.connect(err => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1);
    }

    console.log("✅ Connected to the database.");

    db.query("SELECT * FROM counter", (err, results) => {
        if (err) {
            console.error("❌ Query error:", err.message);
            process.exit(1);
        }

        console.log("📦 Table contents:", results);
        db.end(); // Close the connection
    });
});
