import express  from "express";
import { signupUser,loginUser } from "../controller/user-controller.js";
import { createBlog,allBlogs,deleteBlog,detailBlog,updateBlog } from "../controller/blog-controller.js"
import requireLogin from "../middleware/requireLogin.js";


const router=express.Router();
 
router.post("/signup",signupUser)
router.post("/login",loginUser);

router.post("/createBlog",requireLogin,createBlog)
router.get("/allBlogs",requireLogin,allBlogs);
router.delete("/deleteBlog/:id",requireLogin,deleteBlog);
router.get("/blogDetail/:id",requireLogin,detailBlog);
router.put("/update/:id",requireLogin,updateBlog)

export default router;