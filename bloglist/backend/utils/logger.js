const config = require("./config");

const info = (...params) => {
	if (config.environment !== "test"){
		console.log(...params);
	}
};

const error = (...params) => console.error(...params);

module.exports = {
	info, error
};