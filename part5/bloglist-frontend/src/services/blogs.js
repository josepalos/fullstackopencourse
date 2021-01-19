import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data;
}

const create = async (title, author, url) => {
  const headers = {
    Authorization: token
  }
  const response = await axios.post(baseUrl, {title, author, url}, {headers});
  return response.data;
}

export default { getAll, create, setToken }