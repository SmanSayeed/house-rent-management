require("./config/db");

const app = require("express")();
const bodyParser = require("express").json;
const cors = require("cors");
const routes = require("./routes/routes");

//cors
app.use(cors());
//for accepting post form data
app.use(bodyParser());
//registering routes
app.use(routes);

module.exports = app;