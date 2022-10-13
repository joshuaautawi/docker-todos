const {
  getTodos,
  getTodo,
  deleteTodo,
  updateTodo,
  createTodo,
} = require("../controllers/todoController");

const router = require("express").Router();

router.get("/", getTodos);
router.get("/:id", getTodo);
router.delete("/:todoId", deleteTodo);
router.patch("/:tId", updateTodo);
router.post("/", createTodo);

module.exports = router;
