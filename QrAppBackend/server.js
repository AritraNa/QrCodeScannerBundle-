const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5050

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

// Create table
const db = mysql.createConnection({
    host: 'localhost',      // or your remote DB host
    user: 'root',           // your MySQL username
    password: 'Chumki',
    database: 'qr_app_db'
});

db.connect(err => {
    if (err) {
        console.error('❌ MySQL connection error:', err);
        return;
    }
    console.log('✅ Connected to MySQL');

    // Create table if not exists
    const createTable = `
    CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        age INT,
        mobileNumber VARCHAR(15),
        transactionAmount INT,
        timestamp DATETIME
    )
    `;
    db.query(createTable, (err) => {
        if (err) console.error('Error creating table:', err);
        else console.log('✅ Table ready');
    });
});

app.get('/entries', (req, res) => {
    db.query('SELECT * FROM transactions ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ success: true, data: results });
    });
});
app.get('/test', (req, res) => {
    console.log("helo")
    res.send("Test successful");
});
app.post('/submit', (req, res) => {
    const { name, age, mobileNumber, transactionAmount, timestamp } = req.body;
    console.log('📦 Received:', req.body);
    const query = `
    INSERT INTO transactions (name, age, mobileNumber, transactionAmount, timestamp)
    VALUES (?, ?, ?, ?, NOW())
    `;

    db.query(query, [name, age, mobileNumber, transactionAmount, timestamp], (err, result) => {
        if (err) {
            console.log('Insert error:', err);
            return res.status(500).json({ success: false, error: 'Failed to insert data' });
        }
        return res.status(200).json({ success: true, insertedId: result.insertId });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://192.168.29.212:${port}`);
});
