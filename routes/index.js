const rtr = require("express").Router();

const dummyRouter = require("./dummy");
const accountRouter = require("./account");
const staffRouter = require("./staff");
const userRuoter = require("./user");
const transactionRouter = require("./transaction");
const customerRouter=require('./customer');
const loginRouter=require('./login');
const adminRouter=require('./admin');
const customerRegisterRouter=require('./customerRegister')

rtr.use("/dummy", dummyRouter);
rtr.use("/account", accountRouter);
rtr.use("/staff", staffRouter);
rtr.use("/user", userRuoter);
rtr.use("/transaction", transactionRouter);
rtr.use('/customer',customerRouter);
rtr.use('/login',loginRouter);
rtr.use('/admin',adminRouter);
rtr.use('/customerRegister',customerRegisterRouter)

module.exports = rtr;
