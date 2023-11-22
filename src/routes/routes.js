const express = require("express");
const userRouter = require("../domains/user/userRoutes");
const noteRouter = require("../domains/notes/noteRouters");
const flatRouter = require("../domains/flat/flatRouters");
const tenantRouter = require("../domains/tenants/tenantRouters");


const router = express.Router();

router.use("/users",userRouter);
router.use("/notes",noteRouter);
router.use("/flats",flatRouter);
router.use("/tenants",tenantRouter);
router.use("/",(req,res)=>{
    res.send("House rent management api is running");
})

module.exports = router;