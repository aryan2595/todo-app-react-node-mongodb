const { body, check } = require("express-validator");

exports.loginSchema = [
  body("email", "Email is required!").not().isEmpty(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars long!"),
];

exports.todoSchema = [
  body("title", "Title is required!").not().isEmpty(),
  body("description").optional(),
  check("date")
    .not()
    .isEmpty()
    .withMessage("Date is required!")
    .isISO8601("yyyy-mm-dd")
    .toDate()
    .custom((date) => {
      const currTime = new Date().getTime() - 24 * 60 * 60 * 1000;

      if (date.getTime() < currTime) {
        throw new Error("Date must be start from today");
      }

      return true;
    }),
  check("status").isIn(["pending", "in_progress", "completed"]),
];

exports.updateTodoSchema = [
  ...this.todoSchema,
  body("id", "ID is required!").not().isEmpty(),
];
