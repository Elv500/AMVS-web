import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/players';

const playerService = {
  getAll: () => axios.get(BASE_URL),
  getById: (id: number) => axios.get(`${BASE_URL}/${id}`),
  create: (data: any) => axios.post(BASE_URL, data),
  update: (id: number, data: any) => axios.put(`${BASE_URL}/${id}`, data),
  delete: (id: number) => axios.delete(`${BASE_URL}/${id}`),
};

export default playerService;