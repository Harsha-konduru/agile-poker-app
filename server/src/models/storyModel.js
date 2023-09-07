const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    storyName: {
      type: String,
      required: true,
    },
    storyDescription: {
        type: String,
        required: true,
    },
    boardUniqueId: {
      type: String,
      required: true,
    },
    ratings: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          rating: {
            type: Number,
            default: -1,
            min: -1,
            max: 20,
          },
        },
    ],
  });

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
