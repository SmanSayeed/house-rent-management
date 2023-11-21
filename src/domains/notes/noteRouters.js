const express = require("express");
const { getNotes, createNote,updateNote,deleteNote } = require("./noteController.js");
const auth = require("../../middleware/auth.js");
const noteRouter = express.Router();

noteRouter.get("/",auth,getNotes);

noteRouter.post("/",auth,createNote);

noteRouter.put("/:id",auth,updateNote);

noteRouter.delete("/:id",auth,deleteNote);


module.exports = noteRouter;