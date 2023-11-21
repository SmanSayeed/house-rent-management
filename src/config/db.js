
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongodb connected");
     // app.listen(PORT,()=>{
    //     console.log("Server started on port no "+PORT)
    // })

}).catch((error)=>{
    console.log(error);
});


