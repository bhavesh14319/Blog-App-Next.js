const express = require('express');

const {registerUser,loginUser,logoutUser} = require("../Controllers/User");
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();


router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",isAuthenticated, logoutUser);
// router.get("/user/",myprofile);
// router.get("/user/blogs",getMyBlogs);
// router.get("/user/:id",getUserProfile);
// router.get("/user/blogs/:id",getUserBlogs);

module.exports = router;