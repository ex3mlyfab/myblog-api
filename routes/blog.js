const express = require("express");
const User = require("../models/User");
const Blogs = require("../models/Blog");
const { authenticate } = require('../middlewares/auth');
const blogRouter = express.Router();

//TO GET ALL BLOG

blogRouter.get("/",async (req,res)=> {

    let page;
    let perPage = 30;
    if(req.query.perPage){
        perPage = parseInt(req.query.perPage);
    }
    if(req.query.page){
        page = parseInt(req.query.page);
    }
    else{
        page = 1;
    }

    // define limit per page
    const limit = perPage;
    const skip = (page - 1) * limit;

    const content = req.query.tags; //trying to sort the get all post by tags
    const title = req.query.title //trying to sort the get all post by title

    try {
        let blog;
        if(content){// I am throwing a condition that if the request has a query of author in it
            blog = await Blogs.find({ content:{ $regex: `${content}`, $options: 'i' }}).skip(skip).limit(limit);// every request has a value(like this /?author:john) which we will have to find the post made by the author: john
        }
        else if(title){
            blog = await Blogs.find({title:{ $regex: `${content}`, $options: 'i' }}.skip(skip).limit(limit)); // the curly braces in the bracket indicates that it's an object
        }
       else{ 
         blog = await Blogs.find({}).skip(skip).limit(limit);
        }
    //     blog.read_count += 1
    //    await blog.save()

        res.status(200).json(blog);
    }
    catch(err){
        res.status(500).json(err)
    }
});

//GET BLOG
blogRouter.get("/:id",async (req,res)=> {

    try {
        const { id }  = req.params
     const blog = await Blogs.findById({_id:id });
        res.status(200).json(blog);
    }
    catch(err){
        res.status(500).json(err)
    }
})
;

//CREATE BlOG
blogRouter.post("/", authenticate,   async (req , res) =>{
    const newBlog = new Blogs({ ...req.body, author_id: req.user._id });
    try {
       const savedBlog  = await newBlog.save();
        res.status(200).json(savedBlog);

    } catch (err) {
        res.status(500).json(err)
    }
})


//UPDATE BLOG
blogRouter.put("/:id",  authenticate,  async (req,res) =>{

    try {
        const updateBlog = await Blogs.findByIdAndUpdate(req.params.id,{//here i used the Post model method to find the post and update it
            $set:req.body,// this is to set whatever is in the req.body as the updated post
        },
        { new: true } // this is for us to see our updated post
        );
        res.status(200).json(updateBlog);
} catch (err) {

    res.status(500).json(err)
}
 }
);

//DELETE BLOG
blogRouter.delete("/:id",  authenticate, async (req,res) =>{

     try {
         await Blogs.findByIdAndDelete(req.params.id)
         res.status(200).json("Post has been deleted!!");
 } catch (err) {

     res.status(500).json(err)
 }

});

module.exports = blogRouter
