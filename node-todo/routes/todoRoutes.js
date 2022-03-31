const router = require("express").Router();
const todoController = require("../controllers/todoController");

// GET
router.get("/get/todoList", todoController.getTodoList);

// POST
router.post("/post/addTodo", todoController.addTodo);

// PUT
router.put("/put/todo", todoController.editTodo);

// DELETE
router.delete("/delete/todo", todoController.deleteTodo);

module.exports = router;
