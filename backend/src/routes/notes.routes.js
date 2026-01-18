import { Router } from "express";
//import controller
import { 
    createNote, 
    deleteNote,
    getAllNotes,
    updateNote
 } from "../controllers/notes.controller.js";

const router = Router()

router.route("/").post(createNote).get(getAllNotes);
router.route("/:id").put(updateNote).delete(deleteNote);


export default router