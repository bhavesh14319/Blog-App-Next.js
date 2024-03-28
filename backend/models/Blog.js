const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    image:{
        public_id:String,
        url:String
    },
    author:{
        type:String,
        required:[true,"Please Add Author Name"]
    },
    title:{
        type:String,
        required:[true,"Please Give Blog Title"]
    },
    description:{
        type:String,
        required:[true,"Please Add Blog Description"]
    },
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt : {
        type:Date,
        default:Date.now()
    },

})

module.exports=mongoose.model("Blog",blogSchema)