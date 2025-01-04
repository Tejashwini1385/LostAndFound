import mysql from 'mysql';

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
    con.query("CREATE DATABASE LostAndFound", (err, result) => {
        if (err) throw err;
        console.log("Database created");
    });
});
