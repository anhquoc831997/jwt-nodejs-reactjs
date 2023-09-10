// get the client
import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Anhquoc@83',
    database: 'jwt'
});

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs");
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    // simple query
    connection.query(
        'INSERT INTO Users (email, password, username) VALUES (?, ?, ?)', [email, password, username],
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
        }
    );
    console.log(req.body);
    return res.send("test");
}
module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser
}