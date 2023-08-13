const rtr = require("express").Router();
const { validationResult } = require("express-validator");
const customerModel = require("./../models/customer");
const accountModel = require("../models/account");
const customerMiddlewrae = require("../middlewares/customer");
const {registerCustomerValidators} = require("../middlewares/validators");
const transactionModel = require("../models/transaction");
const { createToken } = require("../helpers/jwt_functions");
const userModel = require("../models/user");

rtr.get("/", async (req, res) => {
  const allCustomer = await customerModel.getByFilter({});
  res.json({
    allCustomer,
  });
});

rtr.get("/accountList", customerMiddlewrae, async (req, res) => {
  const { auth } = req;
  const accounts = await accountModel.getByFilter({ customerId: auth.id });
  res.json({
    accounts,
  });
});


rtr.post("/register", registerCustomerValidators, async (req, res) => {
  const result = validationResult(req);
  
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }

  const { body } = req;

  const custUser = await customerModel.insertCustomer({
    name: body.name,
    phoneNumber: body.phone,
    email: body.email,
    address: body.address,
    pan: body.pan,
  });

  const user = await userModel.insertUser({
    email: body.email,
    password: body.password,
    type: "customer",
    relation_id: custUser._id,
  });

  const payload = {
    id: user._id,
    userType: "customer",
  };

  const token = createToken(payload);

  res.json({
    success: true,
    token,
  });
});

rtr.post("/transaction", customerMiddlewrae, async (req, res) => {
  const { auth, body } = req;

  //to find true customer
  const accounts = await accountModel.getByFilter({
    $and: [
      { customerId: auth.id },
      { accountNumber: { $in: [parseInt(body.from), parseInt(body.to)] } },
    ],
  });

  if (accounts.length != 2) {
    return res.status(400).json("account doesn't exist");
  }

  const fromAccount = accounts.filter(
    (x) => x.accountNumber == parseInt(body.from)
  )[0];
  const toAccount = accounts.filter(
    (act) => act.accountNumber == parseInt(body.to)
  )[0];

  const transAmount = parseFloat(body.amount);

  if (isNaN(transAmount)) {
    return res.status(400).json("invalid amount");
  }

  let baseAmount = parseFloat(fromAccount.amount);
  let toAmount = parseFloat(toAccount.amount);

  if (isNaN(baseAmount)) {
    baseAmount = 0;
  }
  if (isNaN(toAmount)) {
    toAmount = 0;
  }

  if (baseAmount < transAmount) {
    return res.status(400).json("not enough amount in from");
  }

  await accountModel.updateAccountById(fromAccount._id, {
    amount: baseAmount - transAmount,
  });

  await accountModel.updateAccountById(toAccount._id, {
    amount: toAmount + transAmount,
  });

  await transactionModel.insertTrasaction({
    account_id: fromAccount._id.toString(),
    isCredit: false,
    amount: transAmount,
    desc: body.desc,
    type: "online",
  });

  await transactionModel.insertTrasaction({
    account_id: toAccount._id.toString(),
    isCredit: true,
    amount: transAmount,
    desc: body.desc,
    type: "online",
  });

  res.json({
    success: true,
  });
});

rtr.get("/:x", async (req, res) => {
  const id = req.params.x;
  const customer = await customerModel.getById(id);
  res.json({
    customer,
  });
});

rtr.post("/", async (req, res) => {
  const createCustomer = req.body;
  const customer = await customerModel.insertCustomer(createCustomer);
  res.json({
    customer,
  });
});

rtr.put("/:id", async (req, res) => {
  const params = req.body;
  const customer_id = req.params.id;
  await customerModel.updateCustomerById(customer_id, params);
  const customer = await customerModel.getById(customer_id);
  res.json({
    customer,
  });
});

rtr.delete("/:id", async (req, res) => {
  const customer_id = req.params.id;
  await customerModel.deleteCutomerById(customer_id);
  res.json({
    success: true,
  });
});

module.exports = rtr;
