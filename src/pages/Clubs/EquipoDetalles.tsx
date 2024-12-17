import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import teamService from '../../services/teamService';

interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
  ci_number: string;
}

interface Team {
  id: number;
  name: string;
  logo: string | null;
  players: Player[];
}

const BASE_URL = 'http://localhost:8000/storage/';

const EquipoDetalles: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await teamService.getById(Number(id));
        setTeam(response.data);
      } catch (error) {
        console.error('Error al cargar los detalles del equipo', error);
      }
    };

    fetchTeamDetails();
  }, [id]);

  if (!team) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  return (
    <Box p={3}>
      <Button variant="outlined" onClick={() => navigate(-1)}>Volver</Button>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h4">{team.name}</Typography>
        </Box>
        {team.logo && (
          <img
            src={`${BASE_URL}${team.logo}`}
            alt={team.name}
            width="100"
            height="100"
            style={{ objectFit: 'contain' }}
          />
        )}
      </Box>

      <Typography variant="h5" mb={2}>Jugadores</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Posición</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>CI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {team.players.map((player) => (
              <TableRow key={player.id}>
                <TableCell>{player.id}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.position || '-'}</TableCell>
                <TableCell>{player.age || '-'}</TableCell>
                <TableCell>{player.ci_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EquipoDetalles;