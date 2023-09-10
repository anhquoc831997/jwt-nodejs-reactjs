import userService from '../service/userService';

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    // await userService.deleteUser(7);
    console.log(userList);
    return res.render("user.ejs", { userList });
}

const handleCreateNewUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    await userService.createNewUser(email, password, username);

    return res.redirect("/user");
}

const handledelteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}
module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser, handledelteUser
}