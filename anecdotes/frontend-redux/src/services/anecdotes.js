import axios from 'axios';

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createAnecdote = async (anecdote) => {
    const response = await axios.post(baseUrl, anecdote);
    return response.data;
}

const voteAnecdote = async (anecdote) => {
    const data = {
        ...anecdote,
        votes: anecdote.votes + 1
    }
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, data);
    return response.data;
}

export default {
    getAll,
    createAnecdote,
    voteAnecdote
};