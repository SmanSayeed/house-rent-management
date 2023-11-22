require("./config/db");

const app = require("express")();
// const bodyParser = require("express").json;
const bodyParser = require("express").urlencoded({ extended: true });
const cors = require("cors");
const routes = require("./routes/routes");
const multer = require("multer");

//cors
app.use(cors());
//for accepting post form data
// app.use(bodyParser()); // for json
app.use(bodyParser); // form-data

// Set up multer for parsing form data
const upload = multer();
app.use(upload.array());

//registering routes

app.use(routes);

module.exports = app;