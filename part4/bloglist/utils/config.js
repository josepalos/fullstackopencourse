const environment = process.env.NODE_ENV;

const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bloglist";

const MONGODB_OPTIONS = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
};

module.exports = {
	environment,
	PORT,
	MONGODB_URI,
	MONGODB_OPTIONS,
};