import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models';

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

const createNewUser = async (email, password, username) => {
    let hashPass = hashPassword(password);
    try {
        await db.User.create({
            username: username,
            password: hashPass,
            email: email
        });
    } catch (error) {
        console.log("check error", error);
    }

    //const [rows, fields] = await connection.execute('INSERT INTO User (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username]);


}

const getUserList = async () => {
    // let users = [];
    // // create the connection
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'Anhquoc@83', database: 'jwt', Promise: bluebird });

    // const [rows, fields] = await connection.execute('SELECT * FROM `User`');
    // return rows;
    let users = [];
    users = await db.User.findAll();
    return users;

}

const deleteUser = async (userId) => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'Anhquoc@83', database: 'jwt', Promise: bluebird });

    // const [rows, fields] = await connection.execute('DELETE  FROM `User` where id = ?', [id]);
    // return rows;
    await db.User.destroy({
        where: {
            id: userId
        }
    });
}

const getUserById = async (id) => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'Anhquoc@83', database: 'jwt', Promise: bluebird });

    // const [rows, fields] = await connection.execute('SELECT *  FROM `User` where id = ?', [id]);
    // return rows;
    const userById = await db.User.findByPk(id);
    if (userById === null) {
        console.log('Not found!');
        return null;
    } else {
        return userById;
    }

}
const updateUserInfo = async (userEmail, userName, userId) => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'Anhquoc@83', database: 'jwt', Promise: bluebird });

    // const [rows, fields] = await connection.execute('UPDATE User SET email = ? , username = ? where id = ?', [email, username, id]);
    await db.User.update({
        email: userEmail,
        username: userName
    }, {
        where: {
            id: userId
        }
    });
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}