const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

let mongod;

const connectDatabase = async () => {
	let uri = config.MONGODB_URI;

	if(config.environment === "test"){
	    const { MongoMemoryServer } = require("mongodb-memory-server");
	    mongod = new MongoMemoryServer();
	    uri = await mongod.getUri();
	}

	logger.info("Connecting to", uri);
	await mongoose.connect(uri, config.MONGODB_OPTIONS);
};

const closeDatabase = async () => {
    await mongoose.connection.close();
    if(config.environment === "test"){
        await mongod.stop();
    }
}

module.exports = {
    connectDatabase,
    closeDatabase,
};