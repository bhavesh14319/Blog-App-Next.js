const express = require('express');

const {createBlog, getAllBlogs, getMyBlogs,getBlog,deleteBlog} = require("../Controllers/Blog");
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();


router.post("/createBlog", isAuthenticated, createBlog);

router.get("/getAllBlogs",isAuthenticated, getAllBlogs)

router.get("/getMyBlogs", isAuthenticated, getMyBlogs)

router.get("/blog/:id",isAuthenticated,getBlog);

router.delete("/blog/:id",isAuthenticated,deleteBlog);


module.exports=router;