import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/teams';

const teamService = {
  getAll: () => axios.get(BASE_URL),
  getById: (id: number) => axios.get(`${BASE_URL}/${id}`),
  create: (data: FormData) => axios.post(BASE_URL, data),
  update: (id: number, data: FormData) => {
    data.append('_method', 'PUT'); // Agregar el método PUT explícito
    return axios.post(`${BASE_URL}/${id}`, data);
  },
  delete: (id: number) => axios.delete(`${BASE_URL}/${id}`),

  // Nueva función para obtener la tabla de posiciones por torneo
  getLeaderboardByTournament: (tournamentId: number) =>
    axios.get(`${BASE_URL}/leaderboard/tournament/${tournamentId}`),
};

export default teamService;