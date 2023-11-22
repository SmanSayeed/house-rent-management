const sendResponse = require("../../utility/response");
// flatController.js

const flatService = require("./flatServices");

const createFlat = async (req, res) => {
    const { title, description } = req.body;

    try {
        const newFlat = await flatService.createFlat({
            title: title,
            description: description,
            userId: req.userId
        });
        // res.status(201).json(newFlat);
        sendResponse(res, 'success', 201, 'Flat created successfully', newFlat);
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: "Something went wrong" });
        // sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
        sendResponse(res, 'error', 500);
    }
};

const updateFlat = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    try {
        const updatedFlat = await flatService.updateFlat(id, {
            title: title,
            description: description,
            userId: req.userId
        });
        res.json(updatedFlat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const deleteFlat = async (req, res) => {
    const id = req.params.id;

    try {
        const flat = await flatService.deleteFlat(id);
        res.status(202).json(flat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getFlats = async (req, res) => {
    try {
        const flats = await flatService.getFlats();
        res.status(200).json(flats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { createFlat, updateFlat, deleteFlat, getFlats };
