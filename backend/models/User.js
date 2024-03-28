const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true, "Please Enter Your Name"]
    },

    email : {
        type : String,
        required:[true,"Please Enter Your Email"],
        unique:[true,"Email Alredy Exists"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Password"],
        minLength : [6,"Password must be ateast of 6 characters"],
        select:false,
    },
    avatar:{
        public_id:String,
        url:String,
    },
    blogs : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Blog"
        }
    ]
})

//before saving hash the password
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
  next()
})

module.exports=mongoose.model("User",userSchema);
