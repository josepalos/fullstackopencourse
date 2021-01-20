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

const likeBlog = async (blogData) => {
  const headers = {Authorization: token};
  const newData = {...blogData, likes: blogData.likes + 1}
  delete newData["user"];
  const response = await axios.put(`${baseUrl}/${blogData.id}`, newData, {headers});

  return response.data;
}

const deleteBlog = async (blogId) => {
  const headers = {Authorization: token};
  const response = await axios.delete(`${baseUrl}/${blogId}`, {headers});

  return response.data;
}

export default { setToken, getAll, create, likeBlog, deleteBlog }