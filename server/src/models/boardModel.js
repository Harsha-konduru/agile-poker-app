const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  boardId: {
    type: String,
    unique: true,
    required: true,
  },
  boardName: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  boardExpiryDate: {
    type: Date,
    default: function () {
      const oneHourFromNow = new Date();
      oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
      return oneHourFromNow;
    },
  },
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
