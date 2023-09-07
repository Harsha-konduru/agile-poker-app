const asyncHandler = require("express-async-handler");
const Board = require("../models/boardModel");
const { v4: uuidv4 } = require('uuid'); 


//@description     Create Board
//@route           POST /api/board/
const createBoard = asyncHandler(async (req, res) => {
    try{
        const {body} = req;
        const randomId = uuidv4();
        console.log("Trying to create new board");
        const newBoard = new Board({
            "boardId": randomId,
            "boardName": body.boardName,
            "description": body.description
        });
        const createdBoard = await newBoard.save();
        console.log("Created Board successfully: ", createdBoard._id);
        res.status(200).json({
            status: 200,
            data: createdBoard.boardId
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//@description     Sample Board
//@route           GET /api/board/
const sampleBoard = asyncHandler(async (req, res) => {
    
    try{
        res.json({message: "Reached Board API"});
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});
module.exports = {
    createBoard,
    sampleBoard,
};