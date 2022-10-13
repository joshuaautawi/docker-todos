const { Op } = require("sequelize");
const { activity } = require("../models");

const getOneActivityById = async (id) => {
  try {
    const result = await activity.findOne({
      where: { id, deleted_at: { [Op.is]: null } },
    });
    return result;
  } catch (error) {
    throw new Error("Error has occured");
  }
};

const getActivities = async (req, res) => {
  try {
    const data = await activity.findAll({
      where: { deleted_at: { [Op.is]: null } },
    });
    if (data.length == 0)
      return res.status(404).json({
        status: "Not Found",
        message: `Activity NOT Found`,
        data: [],
      });
    return res.status(200).json({ status: "Success", message: "Status", data });
  } catch (error) {
    return res.status(500).json({ code: 500, status: "ERROR", error });
  }
};

const getActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getOneActivityById(id);
    if (!data)
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${id} NOT Found`,
        data: {},
      });
    return res.status(200).json({ status: "Success", message: "Status", data });
  } catch (error) {
    return res.status(500).json({ code: 500, status: "ERROR", error });
  }
};
const createActivity = async (req, res) => {
  try {
    const { title, email } = req.body;
    const data = await activity.create({
      title,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return res.status(201).json({ status: "Success", message: "Status", data });
  } catch (error) {
    return res.status(500).json({ code: 500, status: "ERROR", error });
  }
};
const deleteActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const data = await getOneActivityById(activityId);
    if (!data)
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${activityId} NOT Found`,
        data: {},
      });
    data.deleted_at = new Date();
    await data.save();

    return res.status(200).json({ status: "Success", message: "Status", data });
  } catch (error) {
    return res.status(500).json({ code: 500, status: "ERROR", error });
  }
};
const updateActivity = async (req, res) => {
  try {
    const { actId } = req.params;
    console.log(actId);
    const { title } = req.body;
    const data = await getOneActivityById(actId);
    data.title = title;
    await data.save();
    if (!data)
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${actId} NOT Found`,
        data: {},
      });
    return res.status(200).json({ status: "Success", message: "Status", data });
  } catch (error) {
    return res.status(500).json({ code: 500, status: "ERROR", error });
  }
};

module.exports = {
  updateActivity,
  deleteActivity,
  getActivities,
  getActivity,
  createActivity,
  getOneActivityById
};
