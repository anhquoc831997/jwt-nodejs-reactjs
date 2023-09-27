import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const checkEmailExist = async (userEmail) => {

    let user = await db.User.findOne({
        where: { email: userEmail }
    });

    if (user) {
        return true;
    }
    return false;

}

const checkPhoneExist = async (userPhone) => {

    let phoneUser = await db.User.findOne({
        where: { phone: userPhone }
    });

    if (phoneUser) {
        return true;
    }
    return false;

}

const registerNewUser = async (rowUserData) => {
    // check email, phone number
    let isEmailExist = await checkEmailExist(rowUserData.email);
    if (isEmailExist === true) {
        return ({
            EM: 'The email is already exist',
            EC: 1
        });
    }
    let isPhoneExist = await checkPhoneExist(rowUserData.phone);
    if (isPhoneExist === true) {
        return ({
            EM: 'The phone is already exist',
            EC: 1
        });
    }
    //hash user password
    let hashPass = hashPassword(rowUserData.password);

    //create new user
    try {
        await db.User.create({
            username: rowUserData.username,
            password: hashPass,
            email: rowUserData.email,
            phone: rowUserData.phone,
        });
    } catch (e) {
        console.log('error', e);
        return ({
            EM: 'something wrong in service',
            EC: -2
        });
    }
    return ({
        EM: 'A user is create successfully',
        EC: 0
    })
}
const loginUser = async (rowUserData) => {
    const phoneRegex = /^[0-9]{10}$/; // Mã regex cho số điện thoại 10 chữ số
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;// Mã regex cho email
    if (emailRegex.test(rowUserData.valueLogin)) {
        // check email, phone number
        let isEmailExist = await checkEmailExist(rowUserData.valueLogin);
        if (isEmailExist === false) {
            return ({
                EM: 'Your email/phone number or password is incorrect',
                EC: 1
            });
        }
        //create new user
        try {
            let user = await db.User.findOne({
                where: {
                    email: rowUserData.valueLogin,
                }
            });
            console.log(user.password);
            if (bcrypt.compareSync(rowUserData.password, user.password)) {
                return ({
                    EM: 'Login success',
                    EC: 0
                });
            }
        } catch (e) {
            console.log('error', e);
            return ({
                EM: 'something wrong in service',
                EC: -2
            });
        }
    }
    if (phoneRegex.test(rowUserData.valueLogin)) {
        let isPhoneExist = await checkPhoneExist(rowUserData.valueLogin);
        if (isPhoneExist === false) {
            return ({
                EM: 'Your email/phone number or password is incorrect',
                EC: 1
            });
        }
        try {
            let user = await db.User.findOne({
                where: {
                    phone: rowUserData.valueLogin,
                }
            });
            console.log(user.password);
            if (bcrypt.compareSync(rowUserData.password, user.password)) {
                return ({
                    EM: 'Login success',
                    EC: 0
                });
            }
        } catch (e) {
            console.log('error', e);
            return ({
                EM: 'something wrong in service',
                EC: -2
            });
        }

    }


    return ({
        EM: 'Your email/phone number or password is incorrect',
        EC: 1
    })
}
module.exports = {
    registerNewUser, loginUser
}