const express = require("express");
const {
  createStory,
  getStory,
  updateStoryRatings,
  sampleStory,
} = require("../controllers/storyControllers");

const router = express.Router();

router.route("/createStory/").post(createStory);
router.route("/updateStoryRatings/").post(updateStoryRatings);
router.route("/getStory/:boardId/:storyId").get(getStory);
router.route("/sampleStory").get(sampleStory);

module.exports = router;