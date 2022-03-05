const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

//connect mongodb
const connectDB = require("./server/database/connection.js");

const app = express();

//dotenv
dotenv.config({
  path: "config.env",
});
const PORT = process.env.PORT || 8080;

//connect mongodb
connectDB();

//log request
app.use(morgan("tiny"));

//parse reqest to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");
// app.set('views', path.resolve(__dirname, 'views'));

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//load routers
app.use("/", require("./server/routes/router.js"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
