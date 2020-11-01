const express = require("express");
const logger = require("./utils/logger");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const { connectDatabase } = require("./database");

connectDatabase()
	.then(() => logger.info("Connected to MongoDB"))
	.catch((error) => logger.error("Error connecting to MongoDB:", error));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;