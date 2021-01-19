import axios from 'axios';
const baseUrl = '/api';

const login = async (username, password) => {
    const response = await axios.post(`${baseUrl}/login`, {username, password});
    return response.data;
}

const signUp = async (name, username, password) => {
    const response = await axios.post(`${baseUrl}/users`, {name, username, password});
    console.log(response);
    return response.data
}

export default { login, signUp };