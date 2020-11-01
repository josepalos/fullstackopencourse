const mongoose = require("mongoose");

const url = "mongodb://localhost/fullstackcourse";

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true,
	useCreateIndex: true
});

const personSchema = new mongoose.Schema({
	name: String,
	phone: String,
});

const Person = mongoose.model("Person", personSchema);

function add_new_person(name, phone) {
	const new_person = new Person({
		name: name,
		phone: phone,
	});

	new_person.save().then(result => {
		console.log(`Added person ${result.name} (${result.phone}) to phonebook`);
		mongoose.connection.close();
	});
}

function list_persons() {
	Person.find({}).then(result => {
		console.log("Phonebook");
		console.log("=========");
		result.forEach(person => {
			console.log(`- ${person.name}: ${person.phone}`);
		});
		mongoose.connection.close();
	});
}

if (process.argv.length < 3) {
	list_persons();
} else {
	const name = process.argv[2];
	const phone = process.argv[3];
	add_new_person(name, phone);
}
