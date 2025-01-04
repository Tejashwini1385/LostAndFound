var mysql = require('mysql');
// Create connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL root password
    database: 'LostAndFound' // Ensure the database exists
});

// Connect to MySQL
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL!");

    // Table: users
    const usersTable = `
        CREATE TABLE IF NOT EXISTS user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstname VARCHAR(250) NOT NULL,
            middlename TEXT DEFAULT NULL,
            lastname VARCHAR(250) NOT NULL,
            username VARCHAR(255) UNIQUE NOT NULL, -- Use VARCHAR for unique index
            password TEXT NOT NULL,
            last_login DATETIME DEFAULT NULL,
            type TINYINT(1) NOT NULL DEFAULT 0,
            date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `;

    // Table: inquiry_list
    const inquiryListTable = `
        CREATE TABLE IF NOT EXISTS inquiryList (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            fullname TEXT NOT NULL,
            contact TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            status TINYINT(1) NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `;

    // Table: category_list
    const categoryListTable = `
        CREATE TABLE IF NOT EXISTS categoryList (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            status TINYINT(1) NOT NULL DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `;

    // Table: item_list
    const itemListTable = `
        CREATE TABLE IF NOT EXISTS itemList (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            category_id BIGINT NOT NULL,
            fullname VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            contact VARCHAR(255) NOT NULL,
            image_path VARCHAR(255) DEFAULT NULL,
            status TINYINT(1) NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category_list(id) 
            ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `;

    // Create tables in sequence
    con.query(usersTable, function (err, result) {
        if (err) throw err;
        console.log("Table 'users' created or already exists.");
    });

    con.query(inquiryListTable, function (err, result) {
        if (err) throw err;
        console.log("Table 'inquiry_list' created or already exists.");
    });

    con.query(categoryListTable, function (err, result) {
        if (err) throw err;
        console.log("Table 'category_list' created or already exists.");
    });

    con.query(itemListTable, function (err, result) {
        if (err) throw err;
        console.log("Table 'item_list' created or already exists.");
    });

    // Close connection
    con.end(function (err) {
        if (err) throw err;
        console.log("Connection closed.");
    });
});
