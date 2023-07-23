const rtr = require("express").Router();
const user = require("../models/user");
const customer = require("../models/customer");

rtr.post("/register", async (req, res) => {
  const cred = req.body;

  const customerUser = await customer.insertCustomer({
    name: cred.name,
    phoneNumber: cred.phoneNumber,
    email: cred.email,
    address: cred.address,
    pan: cred.pan,
  });
  const users = await user.insertUser({
    email: cred.email,
    password: cred.password,
    type: "customer",
    relation_id: customerUser._id,
  });
  console.log(users);

  res.json({
    success: true,
  });
});

module.exports = rtr;
