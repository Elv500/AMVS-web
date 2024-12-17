// src/services/newsService.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/news';

export default{
  getAll: async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  create: async (data: FormData) => {
    const response = await axios.post(BASE_URL, data);
    return response.data;
  },

  update: async (id: number, data: FormData) => {
    const response = await axios.post(`${BASE_URL}/${id}?_method=PUT`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  },
};
