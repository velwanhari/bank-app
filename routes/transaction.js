const rtr = require("express").Router();
const transactionModel = require("./../models/transaction");

rtr.get("/", async (req, res) => {
  const allTrasaction = await transactionModel.getByFilter({});
  res.json({
    allTrasaction,
  });
});

rtr.get("/:x", async (req, res) => {
  const id = req.params.x;
  const transaction = await transactionModel.getById(id);
  // const query = req.query;
  res.json({
    transaction,
  });
});

rtr.post("/", async (req, res) => {
  const createTransaction = req.body;
  const transaction = await transactionModel.insertTrasaction(
    createTransaction
  );
  res.json({
    transaction,
  });
});

rtr.put("/:id", async (req, res) => {
  const params = req.body;
  const transaction_id = req.params.id;

  await transactionModel.updateTransactionById(transaction_id, params);
  const transaction = await transactionModel.getById(transaction_id);

  res.json({
    transaction,
  });
});

rtr.delete("/:id", async (req, res) => {
  const transaction_id = req.params.id;
  await transactionModel.deletTransactionById(transaction_id);
  res.json({
    success: true,
  });
});

module.exports = rtr;
