import userService from '../service/userService';

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render("user.ejs", { userList });
}

const handleCreateNewUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    await userService.createNewUser(email, password, username);

    return res.redirect("/user");
}

const handledeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

const getUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let userData = await userService.getUserById(id);
    //console.log(user);
    return res.render("user-update.ejs", { userData });
}

const handleupdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    //console.log(req);
    await userService.updateUserInfo(email, username, id);
    return res.redirect("/user");
}
module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser, handledeleteUser, getUpdateUserPage, handleupdateUser
}