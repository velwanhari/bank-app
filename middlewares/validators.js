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
  body("password").isLength({ min: 6 }).withMessage("min 6 req"),
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
    .withMessage("must be proper email"),
];

module.exports = {
  registerCustomerValidators,
};
