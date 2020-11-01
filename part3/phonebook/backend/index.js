const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

// Configure database


// Configure logging
morgan.token("post-data", req => JSON.stringify(req.body));

// Use statics to load frontend if exists
app.use(express.static("build"));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post-data"));

// Routes
app.get("/api/persons", (request, response, next) => {
	Person.find({})
		.then(persons => {
			response.json(persons);
		})
		.catch(error => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person);
			} else {
				response.status(404).end(`Could not find person ${request.params.id}`);
			}
		})
		.catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			if (result) {
				response.status(204).end();
			} else {
				response.status(404).end();
			}
		})
		.catch(error => next(error));
});

function updatePerson(identifier, content) {
	return new Promise((resolve, reject) => {
		const person = {
			name: content.name,
			phone: content.phone,
		};
		Person.findByIdAndUpdate(identifier, person, { new: true })  // new option sets the callback to use the updated object
			.then(updatedPerson => resolve(updatedPerson))
			.catch(error => reject(error));
	});
}

function addPerson(content) {
	return new Promise((resolve, reject) => {
		const person = new Person({
			name: content.name,
			phone: content.phone,
		});
		person.save()
			.then(person => resolve(person))
			.catch(error => reject(error));
	});
}

app.post("/api/persons", (request, response, next) => {
	const content = request.body;

	if (!content.name) {
		return response.status(400).json({ error: "name missing" });
	} else if (!content.phone) {
		return response.status(400).json({ error: "phone missing" });
	}

	/*
	// Exercise 3.17
	Person.findOne({name: content.name})
		.then(foundPerson => {
			if(foundPerson){
				console.log(`Person found for name ${content.name} in the database with id: ${foundPerson._id} `);
				updatePerson(foundPerson._id, content)
					.then(savedPerson => response.json(savedPerson))
					.catch(error => next(error))
			}else{
				addPerson(content)
					.then(savedPerson => response.json(savedPerson))
					.catch(error => next(error));
			}
		})
		.catch(error => next(error));
	*/

	// Exercise 3.19
	addPerson(content)
		.then(savedPerson => response.json(savedPerson))
		.catch(error => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
	const content = request.body;
	updatePerson(request.params.id, content)
		.then(updatedPerson => response.json(updatedPerson))
		.catch(error => next(error));
});

app.get("/info", (request, response, next) => {
	Person.estimatedDocumentCount()
		.then(count => {
			const content = `<p>Phonebook has info for ${count} people</p>` +
				`<p>${new Date(Date.now()).toISOString()}</p>`;
			response.send(content);
		})
		.catch(error => next(error));
});

// Define custom middlewares
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "Unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "Malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
