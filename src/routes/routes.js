const express = require("express");
const userRouter = require("../domains/user/userRoutes");
const noteRouter = require("../domains/notes/noteRouters");


const router = express.Router();

router.use("/users",userRouter);
router.use("/notes",noteRouter);
router.use("/",(req,res)=>{
    res.send("House rent management api is running");
})

module.exports = router;