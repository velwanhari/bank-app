const rtr = require("express").Router();
const { validationResult } = require("express-validator");
const staffModel = require("./../models/staff");
const staffMiddleware = require("../middlewares/staff");
const customerModel = require("../models/customer");
const accountModel = require("../models/account");
const transactionModel = require("../models/transaction");
const {staffTransactionValidators} = require("../middlewares/validators");

rtr.get("/", async (req, res) => {
  const allStaff = await staffModel.getByFilter({});
  res.json({
    allStaff,
  });
});

rtr.post("/customerList", staffMiddleware, async (req, res) => {
  const { body } = req;
  const { customerId } = body;
  if (!!customerId) {
    const customer = await customerModel.getById({ id: customerId });
    res.json({
      customer,
    });
  } else {
    const customers = await customerModel.getByFilter({});
    res.json({
      customers,
    });
  }
});

rtr.post("/accountList", staffMiddleware, async (req, res) => {
  const { body } = req;
  const accounts = await accountModel.getByFilter({ customerId: body.id });
  res.json({
    accounts,
  });
});

rtr.post("/customerKyc", staffMiddleware, async (req, res) => {
  const { auth, body } = req;
  console.log(body);
  const customer = await customerModel.updateCustomerById(body.customerId, {
    kyc: body.kyc,
  });
  res.json({
    customer,
  });
});

rtr.post(
  "/customer/transaction",
  staffMiddleware,
  staffTransactionValidators,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { body } = req;

    //to find true customer

    const accounts = await accountModel.getByFilter({
      customerId: body.customerId,
      accountNumber: parseInt(body.accountNumber),
    });
    if (accounts.length == 0) {
      return res.status(400).json("account doesn't exist");
    }
    const account = accounts[0];
    let { amount } = account;
    amount = parseFloat(amount);
    if (isNaN(amount)) {
      amount = 0;
    }
    if (body.type == "credit") {
      amount = parseFloat(amount) + parseFloat(body.amount);
    }
    if (body.type == "debit") {
      if (parseFloat(amount) > parseFloat(body.amount)) {
        amount = parseFloat(amount) - parseFloat(body.amount);
      } else {
        return res.status(400).json("not enough balance");
      }
    }
    await accountModel.updateAccountById(account._id, { amount });

    await transactionModel.insertTrasaction({
      account_id: account._id.toString(),
      isCredit: body.type == "credit".toString(),
      amount: body.amount,
      desc: body.desc,
      type: "offline",
    });
    res.json({
      success: true,
    });
  }
);

rtr.get("/:x", async (req, res) => {
  const id = req.params.x;
  const staff = await staffModel.getById(id);
  res.json({
    staff,
  });
});

rtr.post("/", async (req, res) => {
  const createStaff = req.body;
  const staff = await staffModel.insertStaff(createStaff);
  res.json({
    staff,
  });
});

rtr.put("/:id", async (req, res) => {
  const params = req.body;
  const staff_id = req.params.id;

  await staffModel.updateStaffById(staff_id, params);
  const staff = await staffModel.getById(staff_id);
  res.json({
    staff,
  });
});

rtr.delete("/:id", async (req, res) => {
  const staff_id = req.params.id;
  await staffModel.deleteStaffById(staff_id);
  res.json({
    success: true,
  });
});

module.exports = rtr;
