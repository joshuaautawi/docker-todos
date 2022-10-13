const { Op } = require("sequelize");
const { todo } = require("../models");
const { getOneActivityById } = require("./activityController");

const getOneTodoById = async (id) => {
  try {
    const result = await todo.findOne({
      where: { id, deleted_at: { [Op.is]: null } },
    });
    return result;
  } catch (error) {
    throw new Error("Error has occured");
  }
};

const getTodos = async (req, res) => {
  try {
    const { activity_group_id } = req.query;
    const data = await todo.findAll({
      where: { activity_group_id, deleted_at: { [Op.is]: null } },
    });
    if (data.length == 0)
      return res.status(404).json({
        status: "Not Found",
        message: `TODO NOT Found`,
        data: [],
      });
    return res.status(200).json({ status: "Success", message: "Status", data });
  } catch (error) {
    return res.status(500).json({ code: 500, status: "ERROR", error });
  }
};

const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getOneTodoById(id);
    if (!data)
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${id} NOT Found`,
        data: {},
      });
    return res.status(200).json({ status: "Success", message: "Status", data });
  } catch (error) {
    return res.status(500).json({ code: 500, status: "ERROR", error });
  }
};
const createTodo = async (req, res) => {
  try {
    const { activity_group_id, title, priority } = req.body;
    const activity = await getOneActivityById(activity_group_id);
    if (!activity)
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${activity_group_id} NOT Found`,
        data: {},
      });
    const data = await todo.create({
      title,
      activity_group_id,
      is_active: "1",
      priority: priority ? priority : "very-high",
      created_at: new Date(),
      updated_at: new Date(),
    });
    return res.status(201).json({ status: "Success", message: "Status", data });
  } catch (error) {
    return res.status(500).json({ code: 500, status: "ERROR", error });
  }
};
const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const data = await getOneTodoById(todoId);
    if (!data)
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${todoId} NOT Found`,
        data: {},
      });
    data.is_active = "0";
    data.deleted_at = new Date();
    await data.save();

    return res.status(200).json({ status: "Success", message: "Status", data });
  } catch (error) {
    return res.status(500).json({ code: 500, status: "ERROR", error });
  }
};
const updateTodo = async (req, res) => {
  try {
    const { tId } = req.params;
    const { priority, title } = req.body;
    const data = await getOneTodoById(tId);
    data.title = title;
    data.priority = priority;
    await data.save();
    if (!data)
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${tId} NOT Found`,
        data: {},
      });
    return res.status(200).json({ status: "Success", message: "Status", data });
  } catch (error) {
    return res.status(500).json({ code: 500, status: "ERROR", error });
  }
};

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
  getTodos,
};
