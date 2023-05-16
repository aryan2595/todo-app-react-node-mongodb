const router = require("express")();

const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const todoRoute = require("./todoRoute");
const { auth } = require("../middlewares/auth");

router.use("/auth", authRoute);
router.use("/todo", auth, todoRoute);
router.use("/user", auth, userRoute);

module.exports = router;
