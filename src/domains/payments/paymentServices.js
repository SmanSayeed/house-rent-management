// noteService.js
const noteModel = require("./note");

const createNote = async ({ title, description, userId }) => {
    const newNote = new noteModel({
        title: title,
        description: description,
        userId: userId
    });

    try {
        await newNote.save();
        return newNote;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

const updateNote = async (id, { title, description, userId }) => {
    const newNote = {
        title: title,
        description: description,
        userId: userId
    };

    try {
        const updatedNote = await noteModel.findByIdAndUpdate(id, newNote, { new: true });
        return updatedNote;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

const deleteNote = async (id) => {
    try {
        const note = await noteModel.findByIdAndRemove(id);
        return note;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

const getNotes = async (userId) => {
    try {
        const notes = await noteModel.find({ userId: userId });
        return notes;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

module.exports = { createNote, updateNote, deleteNote, getNotes };
