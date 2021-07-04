import axios from "axios";
const baseUrl = "/api";

const getAll = async () => {
    const response = await axios.get(`${baseUrl}/users`);
    // Avoid leaking data by explicitly setting the desired fields
    return response.data.map(u => {
        return { id: u.id, name: u.name, username: u.username, blogs: u.blogs };
    });
};

const login = async (username, password) => {
    const response = await axios.post(`${baseUrl}/login`, { username, password });
    return response.data;
};

const signUp = async (name, username, password) => {
    const response = await axios.post(`${baseUrl}/users`, { name, username, password });
    console.log(response);
    return response.data;
};

export default { getAll, login, signUp };