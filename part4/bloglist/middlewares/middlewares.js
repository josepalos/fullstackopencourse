const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const User = require("../models/user");
const Blog = require("../models/blogs");

const unknownEndpoint = (request, response) =>{
    response.status(404).send({error: "Unknown endpoint"});
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === "CastError") {
		return response.status(400).send({ error: "Malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({error: "Invalid token"})
    }

    logger.error(error.message);    
    next(error);
}


const getTokenFrom = request => {
	const authorization = request.headers.authorization;
	if (authorization && authorization.toLowerCase().startsWith("bearer")){
		return authorization.substring(7);
	}

	return null
}

const getUser = async request => {
	const token = getTokenFrom(request);
	if(!token){
		return null;
	}
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!decodedToken.id){
		return null;
	}
	return await User.findById(decodedToken.id);
}

const tokenizedUserExtractor = async (request, response, next) => {
    request.tokenUser = await getUser(request);
    next();
}

const requireTokenAuth = (request, response, next) => {
	if(!request.tokenUser){
		return response
			.status(401)
			.json({error: "token missing or invalid"});
	}
	next();
}

const userAuthorizedForBlog = async (request, response, next) => {
	const blogToCheck = await Blog
		.findById(request.params.id)
		.populate("users", {});

	if(request.tokenUser.id !== blogToCheck.user.toString()){
		return response
			.status(403)
			.json({error: "user does not own this blog"});
	}

	next();
}

module.exports = {
    unknownEndpoint,
    errorHandler,
	tokenizedUserExtractor,
	requireTokenAuth,
	userAuthorizedForBlog,
}