const asyncHandler = require("express-async-handler");
const Board = require("../models/boardModel");
const User = require("../models/userModel");
const Story = require("../models/storyModel");


//@description     Create User
//@route           POST /api/user/
const createStory = asyncHandler(async (req, res) => {
    try {
        const { storyName, storyDescription, boardUniqueId } = req.body;
        const board = await Board.findOne({ boardId: boardUniqueId });
        if (!board) {
            console.log("Unable to find the board");
            return res.status(400).json({ message: 'Board not found', boardId: boardUniqueId });
        }
        const story = new Story({
          storyName,
          storyDescription,
          boardUniqueId,
        });
        const createdStory = await story.save();
        console.log("Created Story successfully: ", createdStory._id);
        res.status(200).json({
            status: 200,
            story: createdStory
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create story' });
    }
    
});

//@description     Create User
//@route           POST /api/user/
const updateStoryRatings = asyncHandler(async (req, res) => {
    try {
        const { storyId, boardUniqueId, userUniqueId, rating } = req.body;
        const fetchedStory = await Story.findOne({ _id: storyId, boardUniqueId: boardUniqueId, });
    
        if (!fetchedStory) {
            console.log("Unable to find the Story");
            return res.status(400).json({ message: 'Story not found', storyId: storyId });
        }
        //if (Array.isArray(Story.ratings) || Story.ratings.length != 0) {
            //const existingRating = Story.ratings.some((r) => r.user === userUniqueId);
            const fetchedUser = await User.findOne({_id: userUniqueId, boardUniqueId: boardUniqueId});
        
            if (!fetchedUser) {
                return res.status(400).json({ message: 'Unable to add user rating to the given story' });
            }
        //}

        fetchedStory.ratings.push({ user: userUniqueId, rating: rating });
        updatedStory = await fetchedStory.save();

        console.log("User rating added successfully");
        res.status(200).json({
            status: 200,
            message: "User rating added seccessfully",
            story: updatedStory,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            status: 500,
            message: 'Failed to add rating' 
        });
    }
    
});

//@description     Get user
//@route           GET /api/user/
const getStory = asyncHandler(async (req, res) => {
    try {
        const { boardId, storyId } = req.params;
        
        const fetchedStory = await Story.findOne({ _id: storyId, boardUniqueId: boardId, });
    
        if (!fetchedStory) {
            console.log("Unable to find the Story");
            return res.status(400).json({ message: 'Story not found', stroy_Id: storyId });
        }
    
        res.status(200).json({
            status: 200,
            fetchedStory: fetchedStory,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ 
            status: 500,
            message: 'Failed to get story',
            params: req.params,
        });
      }
});

//@description     Sample Board
//@route           GET /api/board/
const sampleStory = asyncHandler(async (req, res) => {
    
    try{
        res.json({message: "Reached Story API"});
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

module.exports = {
    createStory,
    getStory,
    updateStoryRatings,
    sampleStory,
};