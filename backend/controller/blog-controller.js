import Blog from "../model/blog.js";


export const createBlog = async (req,res)=>{
    
    try {
        console.log(req);
        const blog = await new Blog(req.body);
        blog.save();

        res.json({message:'Blog saved successfully'});
    } catch (error) {
        res.json(error);
    }
}


export const allBlogs = (req,res)=>{
console.log("Hiiii")
    Blog.find({})
    .then(blogs=>{
        console.log(blogs)
        return res.json(blogs)})
    .catch((err)=>console.log(err))
}

export const detailBlog =(req,res)=>{
    console.log("from")
    
    // console.log(req)
    console.log(req.params.id)

    Blog.findById(req.params.id)
    .then(blog=>res.json(blog))
    .catch(err=>console.log(err))
   // console.log(req.body.id)
}

export const updateBlog =(req,res)=>{
    Blog.findByIdAndUpdate(req.params.id,req.body)
    .then(blog=>{
        res.json({message:"Blog updated"})
    })
    .catch(err=>console.log(err))
}
export const deleteBlog =(req,res)=>{
    Blog.findByIdAndDelete(req.params.id)
    .then(blog=>{
        res.json({message:"Blog deleted successfully"})
    })
    .catch(err=>console.log(err))
}