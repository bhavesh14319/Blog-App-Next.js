const User = require("../models/User");
const Blog = require("../models/Blog");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cloudinray = require("cloudinary")


const generateToken = async function (id) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET)
}

const matchPassword = async function (password, encPassword) {
    return await bcrypt.compare(password, encPassword);
}

const registerUser = async (req,res)=>{
    try{
        
        const {name,email,password} = req.body;
        const avatar = req.body.image;

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                success:false,
                message:"User Already Exists"
            })
        }

        const mycloud = await cloudinray.v2.uploader.upload(avatar, {
            folder: "avatars"
        })

        user = await User.create({
            name,
            email,
            password,
            avatar:{
                public_id: mycloud.public_id,
                url:mycloud.secure_url
            }
        })

        const token = await generateToken();

        console.log(user);

        res.status(200).cookie("token",token,{
            expires :  new Date(Date.now() + 90*24*60*60*60*1000),
            httpOnly:true
        }).json({
            success:true,
            user,
            token
        })


    }catch(e){
        console.log(e.message);
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}


const loginUser = async (req,res)=>{
    try{
        console.log("Content-Length:", req.headers["content-length"]);
        const{email,password} = req.body;
        
        const user = await User.findOne({email}).select("+password").populate("blogs");


        if(!user){
            return res.status(400).json({
                success:false,
                message : "user does not exist"
            })
        }

        const isMatch = await matchPassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
            })
        }

        const token = await generateToken(user._id);  

        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly:true,
          secure: true, // Necessary when SameSite=None
            sameSite: 'None' // Consider your cross-origin request needs
            // domain: "localhost:3000",
        }).json(
            {
                success: "true",
                user,
                token
            }
        )

    }catch(e){
        console.log(e.message);
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

const logoutUser = async (req, res) => {
    try {

        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({
            success: true,
            message: "Logged Out"
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

module.exports = {registerUser,loginUser,logoutUser};

