const express = require("express");
const {
  createBoard,
  sampleBoard,
} = require("../controllers/boardControllers");

const router = express.Router();

router.route("/createBoard").post(createBoard);
router.route("/sampleBoard").get(sampleBoard);
module.exports = router;