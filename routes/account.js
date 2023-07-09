const rtr = require("express").Router();
const accountModel = require("./../models/account");

rtr.get("/", async (req, res) => {
  const allAccount = await accountModel.getByFilter({});
  // const query = req.query;
  res.json({
    allAccount,
  });
});

rtr.get("/:x", async (req, res) => {
  const id = req.params.x;
  const account = await accountModel.getById(id);
  // const query = req.query;
  res.json({
    account,
  });
});

rtr.post("/", async (req, res) => {
  // create
  const createAccount = req.body;
  const account = await accountModel.insertAccount(createAccount);
  res.json({
    account,
  });
});

rtr.put("/:id", async (req, res) => {
  // update
  const params = req.body;
  const account_id = req.params.id;

  await accountModel.updateAccountById(account_id, params);
  const account = await accountModel.getById(account_id);

  res.json({
    account,
  });
});

rtr.delete("/:id", async (req, res) => {
  const account_id = req.params.id;
  await accountModel.deleteAccountById(account_id);
  res.json({
    success: true,
  });
});

module.exports = rtr;
