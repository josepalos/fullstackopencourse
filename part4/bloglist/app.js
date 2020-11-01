const express = require("express");
require("express-async-errors");
const cors = require("cors");
const bodyParser = require("body-parser");

const middlewares = require("./middlewares/middlewares");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const { connectDatabase } = require("./database");

connectDatabase()
	.then(() => logger.info("Connected to MongoDB"))
	.catch((error) => logger.error("Error connecting to MongoDB:", error));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

module.exports = app;