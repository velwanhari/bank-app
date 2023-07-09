const rtr = require("express").Router();
const userModel = require("./../models/user");

rtr.get("/", async (req, res) => {
  const allUser = await userModel.getByFilter({});
  res.json({
    allUser,
  });
});

rtr.get("/:x", async (req, res) => {
  const id = req.params.x;
  const user = await userModel.getById(id);
  res.json({
    user,
  });
});

rtr.post("/", async (req, res) => {
  // create
  const createUser = req.body;
  const user = await userModel.insertUser(createUser);
  res.json({
    user,
  });
});

rtr.put("/:id", async (req, res) => {
  const params = req.body;
  const user_id = req.params.id;

  await userModel.updateUserById(user_id, params);
  const user = await userModel.getById(user_id);
  res.json({
    user,
  });
});

rtr.delete("/:id", async (req, res) => {
  const user_id = req.params.id;
  await userModel.deleteUserbyId(user_id);
  res.json({
    success: true,
  });
});

module.exports = rtr;
