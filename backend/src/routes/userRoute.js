const { getUserProfile } = require("../controllers/userController");

const router = require("express")();

router.post("/profile", getUserProfile);

module.exports = router;
