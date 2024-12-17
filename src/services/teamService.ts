import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/teams';

const teamService = {
  getAll: () => axios.get(BASE_URL),
  getById: (id: number) => axios.get(`${BASE_URL}/${id}`),
  create: (data: FormData) => axios.post(BASE_URL, data),
  update: (id: number, data: FormData) => axios.post(`${BASE_URL}/${id}`, data),
  delete: (id: number) => axios.delete(`${BASE_URL}/${id}`),
};

export default teamService;