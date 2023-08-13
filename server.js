const express = require("express");
const bodyParser = require("body-parser");
const createError = require("http-errors");
var cors = require('cors')

const routes = require("./routes"); 
const adminMiddleware = require("./middlewares/admin"); 
// const mongoClient = require("./configs/mongoClient");

const app = express();


/* initial configs */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.set("mongo-client", mongoClient());
app.use(cors());


app.get("/api/v1/hello",adminMiddleware, (req, res) => {
  // const client = app.get("mongo-client");
  // console.log("client ::", client);
  console.log("line no 19",req.auth);
  res.send("hello my name is express app.");
});

app.use("/api/v1",routes);

/* unhandled routes will get 404 not found response. */
app.use(function (_, __, next) {
  next(createError(404));
});

module.exports = app;
