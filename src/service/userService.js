import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';


const salt = bcrypt.genSaltSync(10);
// // create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Anhquoc@83',
//     database: 'jwt'
// });
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

const getUserList = async () => {
    let users = [];
    // create the connection
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'Anhquoc@83', database: 'jwt', Promise: bluebird });

    const [rows, fields] = await connection.execute('SELECT * FROM `Users`');
    return rows;

    // connection.query(
    //     'Select * from Users',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err);
    //             return users;
    //         }
    //         users = results;
    //         return users;
    //     }
    // );
}
module.exports = {
    createNewUser, getUserList
}