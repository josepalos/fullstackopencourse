const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const {requireTokenAuth, userAuthorizedForBlog} = require("../middlewares/middlewares");


blogsRouter.get("", async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate("users", {username: 1, name: 1});
	response.json(blogs);
});

blogsRouter.post("", requireTokenAuth, async (request, response) => {
	const newBlog = new Blog({
		...request.body,
		user: request.tokenUser.id
	});
	const savedBlog = await newBlog.save();
	response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id",
	[requireTokenAuth, userAuthorizedForBlog],
	async (request, response) => {
		await Blog.findByIdAndDelete(request.params.id);
		response.status(204).end();
});

blogsRouter.put("/:id",
	[requireTokenAuth, userAuthorizedForBlog],
	async (request, response) => {
		const body = request.body;
		const updatedBlog = {
			...body
		};
		if (updatedBlog.hasOwnProperty("id")){
			if(request.params.id !== updatedBlog.id){
				return response
					.status(400)
					.json({error: "The provided ID does not match with the ID in the url"})
			} else {
				// Clear the field if it exists
				delete updatedBlog.id;
			}
		}

		const allowed = ["likes", "title", "author", "url"];
		
		const unwanted = Object.keys(updatedBlog).filter(f => !(allowed.includes(f)));
		if(unwanted.length !== 0){
			return response
				.status(400)
				.json({error: "Unexpected fields: " + unwanted})
		}
		console.log(request.params.id);
		const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {new: true });
		response.json(blog);
});

module.exports = blogsRouter;