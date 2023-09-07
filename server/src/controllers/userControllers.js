const asyncHandler = require("express-async-handler");
const Board = require("../models/boardModel");
const User = require("../models/userModel");


//@description     Create User
//@route           POST /api/user/
const createUser = asyncHandler(async (req, res) => {
    try {
        const { name, isAuthor, boardId } = req.body;
        const board = await Board.findOne({ boardId: boardId });
        if (!board) {
            console.log("Unable to find the board");
            return res.status(400).json({ message: 'Board not found', boardID: boardId });
        }
        const user = new User({
          "name": name,
          "isAuthor": isAuthor,
          "boardUniqueId": board.boardId, 
        });
        const createdUser = await user.save();
        
        console.log("Created User successfully: ", createdUser._id);
        res.status(200).json({
            status: 200,
            user_Id: createdUser._id
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create user' });
      }
});


//@description     Get user
//@route           GET /api/user/
const getUser = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(req.params);
        const fetchedUser = await User.findById(userId);
    
        if (!fetchedUser) {
            console.log("Unable to find the User");
            return res.status(400).json({ message: 'User not found', userId: userId });
        }
    
        res.status(200).json({
            status: 200,
            fetchedUser: fetchedUser,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ 
            status: "500",
            givenUserID: req.params.userId,
            message: 'Failed to get user' });
      }
});


//@description     Sample Board
//@route           GET /api/board/
const sampleUser = asyncHandler(async (req, res) => {
    
    try{
        res.json({message: "Reached User API"});
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

module.exports = {
    createUser,
    getUser,
    sampleUser,
};