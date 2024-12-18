import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/fields';

const fieldService = {
  getAll: () => axios.get(BASE_URL),
  getById: (id: number) => axios.get(`${BASE_URL}/${id}`),
  create: (data: { name: string; description: string }) => axios.post(BASE_URL, data),
  update: (id: number, data: { name: string; description: string }) =>
    axios.put(`${BASE_URL}/${id}`, data),
  delete: (id: number) => axios.delete(`${BASE_URL}/${id}`),
};

export default fieldService;