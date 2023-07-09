const express = require("express");
const bodyParser = require("body-parser");
const createError = require("http-errors");

const routes = require("./routes"); 
// const mongoClient = require("./configs/mongoClient");

const app = express();

/* initial configs */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.set("mongo-client", mongoClient());

app.get("/api/v1/hello", (req, res) => {
  // const client = app.get("mongo-client");
  // console.log("client ::", client);
  res.send("hello my name is express app.");
});

app.use("/api/v1",routes);

/* unhandled routes will get 404 not found response. */
app.use(function (_, __, next) {
  next(createError(404));
});

module.exports = app;
