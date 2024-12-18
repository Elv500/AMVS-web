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
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import matchService from '../../services/matchesService';
import tournamentService from '../../services/tournamentService';

const RolDePartidos: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  // Cargar torneos al inicio
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await tournamentService.getAll();
        setTournaments(response.data);
      } catch (error) {
        console.error('Error al obtener torneos:', error);
      }
    };
    fetchTournaments();
  }, []);

  // Obtener partidos por torneo
  const fetchMatches = async (tournamentId: number) => {
    setLoading(true);
    try {
      const response = await matchService.getByTournament(tournamentId);
      setMatches(response.data);
    } catch (error) {
      console.error('Error al obtener partidos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambio de torneo seleccionado
  const handleTournamentChange = (event: SelectChangeEvent<number | ''>) => {
    const value = event.target.value;
  
    // Verificar que el valor sea un número antes de asignarlo
    const tournamentId = value === '' ? '' : Number(value);
  
    setSelectedTournament(tournamentId);
  
    if (tournamentId) {
      fetchMatches(tournamentId);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Rol de Partidos
      </Typography>

      {/* Selector de Torneo */}
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

      {/* Tabla de Partidos */}
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Equipo Local</TableCell>
                <TableCell>Equipo Visitante</TableCell>
                <TableCell>Cancha</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matches.length > 0 ? (
                matches.map((match) => (
                  <TableRow key={match.id}>
                    <TableCell>{match.date}</TableCell>
                    <TableCell>{match.time}</TableCell>
                    <TableCell>{match.local_team?.name || 'Equipo no definido'}</TableCell>
                    <TableCell>{match.visitor_team?.name || 'Equipo no definido'}</TableCell>
                    <TableCell>{match.field?.name || 'Cancha no definida'}</TableCell>
                    <TableCell>{match.state}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No hay partidos disponibles para este torneo.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default RolDePartidos;