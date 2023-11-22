const sendResponse = require("../../utility/response");
// noteController.js

const noteService = require("./noteServices");

const createNote = async (req, res) => {
    const { title, description } = req.body;

    try {
        const newNote = await noteService.createNote({
            title: title,
            description: description,
            userId: req.userId
        });
        // res.status(201).json(newNote);
        sendResponse(res, 'success', 201, 'Note created successfully', newNote);
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: "Something went wrong" });
        // sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
        sendResponse(res, 'error', 500);
    }
};

const updateNote = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    try {
        const updatedNote = await noteService.updateNote(id, {
            title: title,
            description: description,
            userId: req.userId
        });
        res.json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const deleteNote = async (req, res) => {
    const id = req.params.id;

    try {
        const note = await noteService.deleteNote(id);
        res.status(202).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getNotes = async (req, res) => {
    try {
        const notes = await noteService.getNotes(req.userId);
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { createNote, updateNote, deleteNote, getNotes };
