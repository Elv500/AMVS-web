import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/matches';

const matchService = {
  getAll: () => axios.get(BASE_URL),
  getByTournament: (tournamentId: number) => axios.get(`${BASE_URL}/tournament/${tournamentId}`),
  create: (data: any) => axios.post(BASE_URL, data),
  delete: (id: number) => axios.delete(`${BASE_URL}/${id}`),
  generateSchedule: (data: { tournament_id: number; start_date: string; interval_minutes: number }) =>
    axios.post(`${BASE_URL}/generate`, data),
  
};

export default matchService;