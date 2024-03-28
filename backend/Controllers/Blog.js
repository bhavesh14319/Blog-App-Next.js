const User = require("../models/User");
const Blog = require("../models/Blog");
const cloudinray = require("cloudinary")

const createBlog = async (req,res)=>{
    try{
        const {image,author,title,description} = req.body;

        const mycloud = await cloudinray.v2.uploader.upload(image, {
            folder: "blogs"
        })

        console.log(req.user)
        const blog = await Blog.create({
            author,
            title,
            description,
            image:{
                public_id:mycloud.public_id,
                url:mycloud.url                
            },
            owner:req.user._id
        })

        const user = await User.findById(req.user._id);

        user.blogs.unshift(blog._id);

        await user.save();

        

        res.status(200).json({
            success:true,
            blog
        })

    }catch(e){
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

const getAllBlogs = async (req,res)=>{
    try{
        
        const blogs = await Blog.find().sort("createdAt");
        blogs.reverse();
        return res.status(200).json({
            success:true,
            blogs
        })

    }catch(e){
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}


const getMyBlogs = async(req,res)=>{
    try{
        const blogs = await Blog.find({owner:req.user._id}).sort("createAt");

        
        blogs.reverse();
        return res.status(200).json({
            success:true,
            blogs
        })

    }catch(e){
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

const getBlog = async( req,res)=>{
    try{
        const blog = await Blog.find({_id:req.params.id}).populate("owner")

        if(blog.length===0){
            return res.status(400).json({
                success:false,
                message:"Blog Does No Exist"
            })
        }


        return res.status(200).json({
            success:true,
            blog
        })

    }catch(e){
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

const deleteBlog = async (req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id);

        if(!blog){
            return res.status(400).json({
                success:false,
                message :" Blog not found"
            })
        }

        console.log(blog);

        if(blog.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }

        await cloudinray.v2.uploader.destroy(blog.image.public_id);
        
       await blog.deleteOne( { _id : req.params.id } )

        const user = await User.findById(req.user._id);

        const index = user.blogs.indexOf(req.params.id);

        user.blogs.splice(index,1);
        
        await user.save();

        res.status(200).json({
            success:true,
            message:"Blog deleted"
        })
        
        
    }catch(e){

        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}
module.exports={createBlog, getAllBlogs ,getMyBlogs ,getBlog,deleteBlog};