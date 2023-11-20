const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRouters");
const mongoose = require("mongoose");
// mongodb+srv://786saadman:<password>@cluster0.fb0togl.mongodb.net/?retryWrites=true&w=majority
app.use(express.json()); //converts request body to json
app.use("/users",userRouter);
app.use("/notes",noteRouter);

mongoose.connect("mongodb+srv://786saadman:cmQaLQN74w3uSXeS@cluster0.fb0togl.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    app.listen(5000,()=>{
        console.log("Server started on port no 5000")
    })

}).catch((error)=>{
    console.log(error);
});



