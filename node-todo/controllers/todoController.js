const { getDb } = require("../config/db-setup");
const { ObjectId } = require("mongodb");

exports.getTodoList = async (req, res, next) => {
  try {
    const todoList = await getDb()
      .db()
      .collection("todolist")
      .find({})
      .toArray();
    return res.status(200).json({ status: 200, apiData: todoList });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, message: "fetching data from db failed" });
  }
};

exports.addTodo = async (req, res, next) => {
  try {
    const { title } = req.body;
    const addedTodo = await getDb()
      .db()
      .collection("todolist")
      .insertOne({ title });
    console.log(addedTodo);
    return res.status(200).json({ status: 200, apiData: addedTodo });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, message: "adding data to db failed" });
  }
};

exports.editTodo = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { title } = req.body;
    await getDb()
      .db()
      .collection("todolist")
      .updateOne({ _id: ObjectId(id) }, { $set: { title } });
    return res
      .status(200)
      .json({ status: 200, message: "successfully updated todo" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, message: "updating data from db failed" });
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.query;
    await getDb()
      .db()
      .collection("todolist")
      .deleteOne({ _id: ObjectId(id) });
    return res
      .status(200)
      .json({ status: 200, message: "successfully deleted todo" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, message: "deletion from db failed" });
  }
};
