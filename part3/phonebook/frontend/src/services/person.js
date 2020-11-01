import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => axios
        .get(baseUrl)
        .then(response => response.data)
        .catch(error => console.log("error fetching data"));

const create = (person) => axios
    .post(baseUrl, person)
    .then(response => response.data);

const update = (person) => axios
    .put(`${baseUrl}/${person.id}`, person)
    .then(response => response.data)
    .catch(error => console.log(error));

const remove = (person) => axios
    .delete(`${baseUrl}/${person.id}`)
    .then(response => response.data)
    .catch(error => console.log(error));

export default { getAll, create, update, remove };