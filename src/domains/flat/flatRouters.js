const express = require("express");
const { getFlats, createFlat,updateFlat,deleteFlat } = require("./flatController.js");
const auth = require("../../middleware/auth.js");
const { validateFlat, validate } = require("./flatValidator.js");
const flatRouter = express.Router();

flatRouter.get("/",auth,getFlats);

flatRouter.post("/",auth,validate ,createFlat);

flatRouter.put("/:id",auth, validate ,updateFlat);

flatRouter.delete("/:id",auth,deleteFlat);


module.exports = flatRouter;