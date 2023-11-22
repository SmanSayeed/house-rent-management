const mongoose = require("mongoose");
const flatSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    booked:{
        type:Boolean,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("flatModel",flatSchema);