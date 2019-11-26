import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => axios
        .get(baseUrl)
        .then(response => response.data)
        .catch(error => {console.log("error fetching data")});

export default { getAll };