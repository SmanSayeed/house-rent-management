const express = require("express");
const { getTenants, createTenant,updateTenant,deleteTenant } = require("./tenantController.js");
const auth = require("../../middleware/auth.js");
const { validateTenant, validate } = require("./tenantValidator.js");
const tenantRouter = express.Router();

tenantRouter.get("/",auth,getTenants);

tenantRouter.post("/",auth,validate,createTenant);

tenantRouter.put("/:id",auth, validate,updateTenant);

tenantRouter.delete("/:id",auth,deleteTenant);


module.exports = tenantRouter;