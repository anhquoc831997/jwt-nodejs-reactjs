import bcrypt from 'bcryptjs';
import mysql from 'mysql2';

const salt = bcrypt.genSaltSync(10);
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Anhquoc@83',
    database: 'jwt'
});
const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = (email, password, username) => {
    let hashPass = hashPassword(password);

    // simple query
    connection.query(
        'INSERT INTO Users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
        }
    );

}

const getUserList = () => {
    let users = [];
    connection.query(
        'Select * from Users',
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            console.log(results);
        }
    );
}
module.exports = {
    createNewUser, getUserList
}