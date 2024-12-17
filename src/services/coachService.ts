import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/coaches';

const coachService = {
  getAll: async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },
  create: async (data: { name: string; email: string; phone?: string }) => {
    const response = await axios.post(BASE_URL, data);
    return response.data;
  },
  update: async (id: number, data: { name: string; email: string; phone?: string }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  },
};

export default coachService;