const express = require("express");
const {
  createUser,
  getUser,
  sampleUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/createUser/").post(createUser);
router.route("/getUser/:userId").get(getUser);
router.route("/sampleUser").get(sampleUser);

module.exports = router;