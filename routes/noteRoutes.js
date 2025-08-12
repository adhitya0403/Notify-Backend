import express from "express";
import {getAllNotes,createNote,updateNote,deleteNote,getNoteById} from "../controllers/noteController.js";
import {auth} from '../middleware/auth.js'



const noteRouter = express.Router();

noteRouter.get("/",auth,getAllNotes);
noteRouter.get("/:id",auth,getNoteById);
noteRouter.post("/",auth,createNote);
noteRouter.put("/:id",auth,updateNote);
noteRouter.delete("/:id",auth,deleteNote);

export default noteRouter;
