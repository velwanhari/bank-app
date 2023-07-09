const rtr = require("express").Router();
const staffModel = require("./../models/staff");

rtr.get("/", async (req, res) => {
  const allStaff = await staffModel.getByFilter({});
  res.json({
    allStaff,
  });
});

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
