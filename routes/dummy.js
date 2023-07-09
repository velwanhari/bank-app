const rtr = require("express").Router();

rtr.get("/", async (req, res) => {
  const query = req.query;

  res.json({
    name: "dummy request",
    myParams: JSON.stringify(query),
  });
});

rtr.post("/", async (req, res) => { // create
  const params = req.body;
  res.json({
    name: "dummy post request",
    params,
  });
});

rtr.put("/:id/fixpath/:childId", async (req, res) => { // update
  const params = req.body;
  const routeParams = req.params;
  res.json({
    name: "dummy post request",
    params,
    routeParams
  });
});

rtr.delete("/:id", async (req, res) => {
//   const params = req.body;
  res.json({
    name: "dummy post request",
    // params,
  });
});

module.exports = rtr;
