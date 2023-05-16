const router = require("express").Router();

const { login } = require("../controllers/authController");
const { loginSchema } = require("../middlewares/schema");
const { validateError } = require("../middlewares/validator");

router.post("/login", loginSchema, validateError, login);

module.exports = router;
