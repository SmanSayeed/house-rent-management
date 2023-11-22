const express = require("express");
const { getNotes, createNote,updateNote,deleteNote } = require("./noteController.js");
const auth = require("../../middleware/auth.js");
const { validateNote, validate } = require("./noteValidator.js");
const noteRouter = express.Router();

noteRouter.get("/",auth,getNotes);

noteRouter.post("/",auth,validate ,createNote);

noteRouter.put("/:id",auth, validate ,updateNote);

noteRouter.delete("/:id",auth,deleteNote);


module.exports = noteRouter;