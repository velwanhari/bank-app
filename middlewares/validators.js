const { body } = require("express-validator");

const registerCustomerValidators = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("name must be having 3 character"),
  body("phone")
    .isLength({ min: 10, max: 10 })
    .isNumeric()
    .withMessage("phone must be having 10 digit"),
  body("email").isEmail().withMessage("must be proper email"),
  body("password").isLength({ min: 6 }).withMessage("min 6 require"),
  body("confromPassword").custom((val, context) => {
    const { body } = context.req;
    if (val !== body.password.trim()) {
      throw new Error("password do not match");
    }
    return true;
  }),
  body("address").notEmpty().withMessage("must be proper email"),
  body("pan")
    .isAlphanumeric()
    .isLength({ max: 10, min: 10 })
    .withMessage("must be prpper pan number"),
];

const createAccountValidators = [
  body("accountType")
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("please select account type"),
];

const loginCustomerValidators = [
  body("email").isEmail().withMessage("must be propor email"),
  body("password").isLength({ min: 6 }).withMessage("min 6 require"),
  body("type").equals("customer").withMessage("please select type"),
];

const loginStaffValidators = [
  body("email").isEmail().withMessage("must be propor email"),
  body("password").isLength({ min: 6 }).withMessage("min 6 require"),
  body("type").equals("staff").withMessage("please select type"),
];

const loginAdminValidators = [
  body("email").isEmail().withMessage("must be propor email"),
  body("password").isLength({ min: 6 }).withMessage("min 6 require"),
  body("type").equals("admin").withMessage("please select type"),
];

const transferAmountValidators = [
  body("fromAcc").notEmpty().withMessage("please Select Account Number"),
  body("toAcc").notEmpty().withMessage("please Select Account Number"),
  body("amount").notEmpty().withMessage("please enter amount"),
];

const staffTransactionValidators = [
  body("accountNumber")
    .notEmpty()
    .withMessage("please select your account number"),
  body("amount").notEmpty().withMessage("please enter proper amount"),
  body("type").notEmpty().withMessage("please selct type"),
  body("desc").notEmpty().withMessage("please write any desc"),
];

module.exports = {
  registerCustomerValidators,
  loginCustomerValidators,
  transferAmountValidators,
  loginStaffValidators,
  loginAdminValidators,
  createAccountValidators,
  staffTransactionValidators,
};
