const express = require("express");
const noteRouter = express.Router();

noteRouter.get("/",(req,res)=>{
    res.send("Note Get Req")
});

noteRouter.post("/",(req,res)=>{
    res.send("Note post req");
});

module.exports = noteRouter;