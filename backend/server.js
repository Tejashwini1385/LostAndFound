const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8086;

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);  // Create the uploads directory if it doesn't exist
}

app.use(bodyParser.json());
app.use(cors());

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save uploaded images in the "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage: storage });

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'LostAndFound',
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Route to add instructor (test route)
app.get('/', (req, res) => {
    console.log("GET request on / endpoint");
    return res.json("From backend side");
});

// Route to add user to the database
app.post('/signUp', (req, res) => {
    console.log('Received signup request:', req.body);

    const { firstname, middlename, lastname, username, password, type } = req.body;

    if (!firstname || !lastname || !username || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `
        INSERT INTO user (firstname, middlename, lastname, username, password, type)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [firstname, middlename || null, lastname, username, password, type];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ message: "User registered successfully", id: result.insertId });
    });
});

// Route to validate login
app.post('/login', (req, res) => {
    console.log('Received login request:', req.body);  // Added logging

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Missing username or password" });
    }

    const sql = `SELECT * FROM user WHERE username = ? AND password = ?`;
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Error during login query:', err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length > 0) {
            console.log('Login successful:', results[0]);  // Add logging for successful login
            return res.status(200).json({ message: "Login successful", user: results[0] });
        } else {
            console.log('Invalid credentials');
            return res.status(401).json({ error: "Invalid username or password" });
        }
    });
});

// Route to add an item to the database
app.post('/post-an-item', upload.single('image'), (req, res) => {
    console.log('Received post-an-item request:', req.body);

    const { fullname, title, description, contact, status } = req.body;

    // Validate required fields
    if (!fullname || !title || !description || !contact || !status) {
        return res.status(400).json({ error: "Missing required fields. Please provide fullname, title, description, contact, and status." });
    }

    // Convert status to TINYINT format (Lost = 0, Found = 1)
    const statusValue = status === "Lost" ? 0 : status === "Found" ? 1 : null;

    // Validate the converted status
    if (statusValue === null) {
        return res.status(400).json({ error: "Invalid status. Status must be either 'Lost' or 'Found'." });
    }

    // Validate if an image is uploaded
    const imagePath = req.file ? `uploads/${req.file.filename}` : null;

    const sql = `
        INSERT INTO itemList (fullname, title, description, contact,image_path, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [fullname, title, description, contact, imagePath,statusValue];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting item:', err.sqlMessage || err);
            return res.status(500).json({ error: "Database error. Unable to save item." });
        }

        console.log('Item posted successfully with ID:', result.insertId);
        return res.status(200).json({ message: "Item posted successfully", id: result.insertId });
    });
});

// Route to fetch lost items
app.get('/lost-items', (req, res) => {
    const sql = `
        SELECT id AS item_id, title, description, contact, image_path
        FROM itemList
        WHERE status = 0
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching lost items:', err.sqlMessage || err);
            return res.status(500).json({ error: 'Database error. Unable to fetch lost items.' });
        }
    
        console.log(results); // Log results to verify `imagePath`
        return res.status(200).json({ items: results });
    });
    
});
// Route to fetch lost items
app.get('/found-items', (req, res) => {
    const sql = `
        SELECT id AS item_id, title, description, contact, image_path
        FROM itemList
        WHERE status = 1
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching found items:', err.sqlMessage || err);
            return res.status(500).json({ error: 'Database error. Unable to fetch found items.' });
        }
    
        console.log(results); // Log results to verify `imagePath`
        return res.status(200).json({ items: results });
    });
    
});
app.post('/feedback', (req, res) => {
    const { user_id, feedback_text } = req.body;
    const query = 'INSERT INTO Feedback (user_id, f_text, submitted_at) VALUES (?, ?, NOW())';
    db.query(query, [user_id, feedback_text], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'Feedback submitted successfully', feedbackId: results.insertId });
    });
  });
  app.get('/feedback-fetch', (req, res) => {
    const query = `
      SELECT f.f_text AS feedback_text, f.submitted_at, u.username AS user_name 
FROM FeedBack f 
JOIN User u ON f.user_id = u.id;`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('Query results:', results); // Add this line
        res.status(200).json(results);
    });
});




  

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
