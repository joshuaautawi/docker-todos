const {
  createActivity,
  getActivity,
  getActivities,
  deleteActivity,
  updateActivity,
} = require("../controllers/activityController");
const router = require("express").Router();

router.get("/", getActivities);
router.get("/:id", getActivity);
router.delete("/:activityId", deleteActivity);
router.patch("/:actId", updateActivity);
router.post("/", createActivity);

module.exports = router;
