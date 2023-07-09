const rtr = require("express").Router();
const customerModel = require("./../models/customer");

rtr.get("/", async (req, res) => {
  const allCustomer = await customerModel.getByFilter({});
  res.json({
    allCustomer,
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
