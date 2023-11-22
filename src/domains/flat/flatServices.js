// flatService.js
const flatModel = require("./flat");

const createFlat = async ({ title, description, userId }) => {
    const newFlat = new flatModel({
        title: title,
        description: description,
        userId: userId
    });

    try {
        await newFlat.save();
        return newFlat;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

const updateFlat = async (id, { title, description, userId }) => {
    const newFlat = {
        title: title,
        description: description,
        userId: userId
    };

    try {
        const updatedFlat = await flatModel.findByIdAndUpdate(id, newFlat, { new: true });
        return updatedFlat;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

const deleteFlat = async (id) => {
    try {
        const flat = await flatModel.findByIdAndRemove(id);
        return flat;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

const getFlats = async () => {
    try {
        const flats = await flatModel.find();
        return flats;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

module.exports = { createFlat, updateFlat, deleteFlat, getFlats };
