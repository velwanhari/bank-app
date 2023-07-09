const { MongoClient } = require("mongodb");
const path = require("path");
const dotenv = require("dotenv");

let client = undefined;

module.exports = () => {
  dotenv.config({ path: path.join(__dirname, "../.env") });

  if (typeof client == "undefined") {
    client = new MongoClient(process.env.MONGO_URL);
  }

  return client;
};
