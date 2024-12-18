import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/tournaments';

const tournamentService = {
  getAll: () => axios.get(BASE_URL),
  create: (data: { name: string; start_date: string; end_date: string; allowed_hours_start: string; allowed_hours_end: string }) =>
    axios.post(BASE_URL, data),
  delete: (id: number) => axios.delete(`${BASE_URL}/${id}`),
};

export default tournamentService;