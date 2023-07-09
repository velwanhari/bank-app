const rtr = require("express").Router();

const dummyRouter = require("./dummy");
const accountRouter = require("./account");
const staffRouter = require("./staff");
const userRuoter = require("./user");
const transactionRouter = require("./transaction");
const customerRouter=require('./customer')

rtr.use("/dummy", dummyRouter);
rtr.use("/account", accountRouter);
rtr.use("/staff", staffRouter);
rtr.use("/user", userRuoter);
rtr.use("/transaction", transactionRouter);
rtr.use('/customer',customerRouter)
module.exports = rtr;
