const express = require("express");
require("express-async-errors");
const cors = require("cors");
const bodyParser = require("body-parser");

const middlewares = require("./middlewares/middlewares");
const logger = require("./utils/logger");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const { connectDatabase } = require("./database");

connectDatabase()
	.then(() => logger.info("Connected to MongoDB"))
	.catch((error) => logger.error("Error connecting to MongoDB:", error));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(middlewares.tokenizedUserExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test"){
	const testingRouter = require("./controllers/testing");
	app.use("/api/testing", testingRouter);
}


app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

module.exports = app;