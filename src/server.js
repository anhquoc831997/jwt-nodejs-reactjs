import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from 'body-parser';
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();

//config view engine
configViewEngine(app);

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log("jwt backend is running on the port = " + PORT);
});