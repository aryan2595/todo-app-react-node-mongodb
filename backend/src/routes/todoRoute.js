const router = require("express")();

const { todoSchema, updateTodoSchema } = require("../middlewares/schema");
const { validateError } = require("../middlewares/validator");

const {
  list,
  detail,
  update,
  changeStatus,
  create,
  destroy,
} = require("../controllers/todoController");

router.get("/list", list);
router.get("/detail/:id", detail);
router.put("/update", updateTodoSchema, validateError, update);
router.put("/change-status", changeStatus);
router.delete("/delete/:id", destroy);
router.post("/create", todoSchema, validateError, create);

module.exports = router;
