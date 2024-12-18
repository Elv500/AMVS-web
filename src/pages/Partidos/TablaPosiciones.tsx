import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import teamService from '../../services/teamService';
import tournamentService from '../../services/tournamentService';

interface Team {
  id: number;
  name: string;
  matches_played: number;
  matches_won: number;
  matches_lost: number;
  points: number;
  logo: string;
  coach: {
    name: string;
  };
}

const TablaDePosiciones: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<Team[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await tournamentService.getAll();
        setTournaments(response.data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchTournaments();
  }, []);

  const fetchLeaderboard = async (tournamentId: number) => {
    setLoading(true);
    try {
      const response = await teamService.getLeaderboardByTournament(tournamentId);
      setLeaderboard(response.data.leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTournamentChange = (event: SelectChangeEvent<number | ''>) => {
    const tournamentId = Number(event.target.value); // Convertir a número
    setSelectedTournament(tournamentId);
    if (tournamentId) {
      fetchLeaderboard(tournamentId);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Tabla de Posiciones
      </Typography>

      {/* Selector de Torneos */}
      <Box mb={3}>
        <Select
          value={selectedTournament}
          onChange={handleTournamentChange}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>
            Seleccione un Torneo
          </MenuItem>
          {tournaments.map((tournament) => (
            <MenuItem key={tournament.id} value={tournament.id}>
              {tournament.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Tabla de Posiciones */}
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell> {/* Nueva columna de posición */}
                <TableCell>Equipo</TableCell>
                <TableCell>Entrenador</TableCell>
                <TableCell>Partidos Jugados</TableCell>
                <TableCell>Ganados</TableCell>
                <TableCell>Perdidos</TableCell>
                <TableCell>Puntos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((team, index) => (
                <TableRow key={team.id}>
                  <TableCell>{index + 1}</TableCell> {/* Enumeración de posiciones */}
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <img
                        src={`http://localhost:8000/storage/${team.logo}`}
                        alt={team.name}
                        style={{ width: 30, height: 30, marginRight: 10, borderRadius: '50%' }}
                      />
                      {team.name}
                    </Box>
                  </TableCell>
                  <TableCell>{team.coach?.name || 'Sin entrenador'}</TableCell>
                  <TableCell>{team.matches_played}</TableCell>
                  <TableCell>{team.matches_won}</TableCell>
                  <TableCell>{team.matches_lost}</TableCell>
                  <TableCell>{team.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TablaDePosiciones;