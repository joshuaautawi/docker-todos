const router = require("express").Router();
const todoRoute = require("./todo.route");
const activityRoute = require("./activity.route");

router.use("/todo-items", todoRoute);
router.use("/activity-groups", activityRoute);

module.exports = router;
