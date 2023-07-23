const rtr = require("express").Router();
const staff = require("../models/staff");
const user = require("../models/user");
const adminMiddleware = require("../middlewares/admin");

rtr.post("/create_staff", adminMiddleware, async (req, res) => {
  const cred = req.body;

  const staffUsers = await staff.insertStaff({
    name: cred.name,
    address: cred.address,
    emp_id: cred.emp_id,
  });
  const users = await user.insertUser({
    email: cred.email,
    password: cred.password,
    type: "staff",
    relation_id: staffUsers._id,
  });

  res.json({
    success: true,
  });
});

module.exports = rtr;
