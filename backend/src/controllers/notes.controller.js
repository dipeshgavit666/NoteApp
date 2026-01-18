import Note from "../models/notes.model.js"
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
// get all notes
const getAllNotes = asyncHandler(async(req, res) => {
    try {
        const allnotes = await Note.find({});
        return res
         .status(200)
         .json(new ApiResponse(
            200,
            {notes: allnotes},
            "All notes fetcjed successfully"
         ));
    } catch (error) {
        throw new ApiError(500, "Server error")
    }
})

//  create Note
const createNote = asyncHandler(async(req, res) => {
    

    try {
        const {title, description} = req.body;


        if(!title || !description){
            throw new ApiError(400, "please provide all fileds");
        }

        const newNote = await Note.create({
            title,
            description
        });
        return res
         .status(201)
         .json(new ApiResponse(
            201,
            {newNote},
            "Note created successfully"
         ))
    } catch (error) {
        throw new ApiError(500, "Server error")
    }
});

// delete note
const deleteNote = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findOneAndDelete(id);
        
        if(!deletedNote){
            throw new ApiError(404, "Note not found")
        }
        
        return res
         .status(200)
         .json(new ApiResponse(
            200,
            {},
            "Note deleted successfully"))

    } catch (error) {
        throw new ApiError(500, "Server error")
    }
});

// update note
const updateNote = asyncHandler(async (req, res) => {

  try {
    const { id } = req.params;
    const note = req.body;

    const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true });

    if (!updatedNote) {
      throw new ApiError(404, "Note not found")
    }

    return res
     .status(200)
      .json( new ApiResponse(
      200,
      {updatedNote},
      "Note updated successfully"
    ));
  } catch (error) {
    throw new ApiError(500, "Server error")
  }
});


export {
    createNote,
    deleteNote,
    updateNote,
    getAllNotes
}