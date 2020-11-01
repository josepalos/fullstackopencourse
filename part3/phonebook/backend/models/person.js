const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGO_URI || "mongodb://localhost/fullstackcourse";

const configuration = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
};

console.log("Connecting to", url);
mongoose.connect(url, configuration)
    .then(result => {
        console.log("Connected to MongoDB");
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error.message);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return v.replace(/[^0-9]/g, "").length >= 8
            }
        },
        unique: false,
    }
});
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Person', personSchema);