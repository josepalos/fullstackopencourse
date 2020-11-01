import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => axios
        .get(baseUrl)
        .then(response => response.data)
        .catch(error => {
            console.error("error fetching data");
            throw(error.response.data.error);
        });

const create = (person) => axios
    .post(baseUrl, person)
    .then(response => response.data)
    .catch(error => {
        console.error(error.response.data.error);
        throw(error.response.data.error);
    });

const update = (person) => axios
    .put(`${baseUrl}/${person.id}`, person)
    .then(response => response.data)
    .catch(error => {
        console.error(error);
        throw(error.response.data.error);
    });

const remove = (person) => axios
    .delete(`${baseUrl}/${person.id}`)
    .then(response => response.data)
    .catch(error => {
        console.error(error);
        throw(error.response.data.error);
    });

export default { getAll, create, update, remove };