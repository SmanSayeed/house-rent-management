
const app = require("./server");


const dotenv = require("dotenv");


// mongodb+srv://786saadman:<password>@cluster0.fb0togl.mongodb.net/?retryWrites=true&w=majority
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
        console.log("Server started on port no "+PORT)
    })

