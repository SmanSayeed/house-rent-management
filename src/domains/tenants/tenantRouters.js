const express = require("express");
const multer = require("multer");
const { getTenants, createTenant,updateTenant,deleteTenant } = require("./tenantController.js");
const auth = require("../../middleware/auth.js");
const { validateTenant, validate } = require("./tenantValidator.js");


const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

const tenantRouter = express.Router();

tenantRouter.get("/",auth,getTenants);

tenantRouter.post("/",auth,
// validate,upload.array("documents", 5),
createTenant);

tenantRouter.put("/:id",auth, validate,upload.array("documents", 5),updateTenant);

tenantRouter.delete("/:id",auth,deleteTenant);


module.exports = tenantRouter;