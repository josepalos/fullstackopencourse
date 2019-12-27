const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");


morgan.token('post-data', function (req, res) { return JSON.stringify(req.body) })

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

let persons = [
    {
      "name": "Arto Hellas",
      "phone": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "phone": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "phone": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "phone": "39-23-6423122",
      "id": 4
    }
]

app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
	const identifier = Number(request.params.id);
	person = persons.find(p => p.id === identifier);

	if(person){
		response.json(person);
	}else{
		response.status(404).end(`Could not find person ${identifier}`);
	}
});

app.delete("/api/persons/:id", (request, response) => {
	const identifier = Number(request.params.id);
	persons = persons.filter(p => p.id !== identifier);
	response.status(204).end();
});

app.post("/api/persons", (request, response) => {
	const content = request.body;

	if(!content.name){
		return response.status(400).json({error: "name missing"});
	} else if (!content.phone){
		return response.status(400).json({error: "phone missing"});
	} else if (content.name in persons.map(p => p.name)){
		return response.status(400).json({error: "name must be unique"});
	}

	let new_person = {
		id: Math.floor(Math.random() * Math.floor(10000000)),
		name: content.name,
		phone: content.phone,
	};

	persons.push(new_person);
});


app.get("/info", (request, response) => {
	content = `<p>Phonebook has info for ${persons.length} people</p>` +
			  `<p>${new Date(Date.now()).toISOString()}</p>`;
	response.send(content);
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
