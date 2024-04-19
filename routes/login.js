const rtr = require("express").Router();
const user = require("./../models/user");
const { createToken } = require("./../helpers/jwt_functions");
const { loginCustomerValidators } = require("../middlewares/validators");
const { loginAdminValidators } = require("../middlewares/validators");
const { loginStaffValidators } = require("../middlewares/validators");
const { validationResult } = require("express-validator");

rtr.post("/admin", loginAdminValidators, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const cred = req.body;
  const adminUsers = await user.getByFilter({ email: cred.email });

  if (!adminUsers || adminUsers.length == 0) {
    return res.status(422).send("email no exist.");
  }

  const adminUser = adminUsers[0];

  if (adminUser.password != cred.password) {
    return res.status(422).send("Password is not correct.");
  }

  const payload = {
    id: adminUser._id,
    userType: "admin",
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWE5ZTc5M2Y5NWI0MDNlMGMwZDNiNCIsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE2ODkyNjAwNzd9.9I5dGR_9tEyc5VXP46oVDG3r0knEPoNS9F8OYyk8WrY"
  };

  const token = createToken(payload);

  res.json({
    success: true,
    token,
  });
});

rtr.post("/staff", loginStaffValidators, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const cred = req.body;
  const staffUsers = await user.getByFilter({ email: cred.email });
  console.log(staffUsers);
  if (!staffUsers || staffUsers.length == 0) {
    return res.status(422).send("email no exist.");
  }

  const staffUser = staffUsers[0];

  if (staffUser.password != cred.password) {
    return res.status(422).send("Password is not vaild.");
  }

  if (staffUser.type != cred.type) {
    return res.status(422).send("not valid type.");
  }

  const payload = {
    id: staffUser._id,
    userType: "staff",
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWZmOTIwNjM2MGQwMzNhNDM4MzljOCIsInVzZXJUeXBlIjoic3RhZmYiLCJpYXQiOjE2ODkyNjAwNTR9.B7M5E2O8EWvpw_6HBmzjOyHmDZ603KvPwk2ZNbSn_1c"
  };

  const token = createToken(payload);

  res.json({
    success: true,
    token,
  });
});

rtr.post("/customer", loginCustomerValidators, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const cred = req.body;
  const customerUsers = await user.getByFilter({ email: cred.email });

  if (!customerUsers || customerUsers.length == 0) {
    return res.status(422).send("email no exists.");
  }

  const customerUser = customerUsers[0];

  if (customerUser.password != cred.password) {
    return res.status(422).send("Paasword is not valid.");
  }

  if (customerUser.type != cred.type) {
    return res.status(422).send("not valid type.");
  }

  const payload = {
    id: customerUser._id,
    userType: "customer",
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjAwMjk5NGFkYzZhMjRlYzQxNzU5YyIsInVzZXJUeXBlIjoiY3VzdG9tZXIiLCJpYXQiOjE2ODkyNTk5ODd9.U-xCX3QLUqwJNmwUL-D-qkysOwaKXUyTKSUzXKRvIFU"
  };

  const token = createToken(payload);

  res.json({
    success: true,
    token,
  });
});

module.exports = rtr;
