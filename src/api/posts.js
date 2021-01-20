import axios from 'axios';
import BASIC_API from './api';

export const getPosts = async () => {
  const response = await axios.get(`${BASIC_API}/posts`);
  return response.data;
};

export const getPostById = async (id) => {
  const response = await axios.get(`${BASIC_API}/posts/${id}`);
  return response.data;
};
