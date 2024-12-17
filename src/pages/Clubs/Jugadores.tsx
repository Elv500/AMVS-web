import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import playerService from '../../services/playerService';
import teamService from '../../services/teamService';
import AddEditPlayerModal from '../../components/modals/AddEditPlayerModal';
import ConfirmationModal from '../../components/modals/ConfirmationModal';

interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
  ci_number: string;
  team?: { id: number; name: string; logo: string | null };
}

const BASE_URL = 'http://localhost:8000/storage/';

const Jugadores: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [playerToDelete, setPlayerToDelete] = useState<number | null>(null);

  useEffect(() => {
    loadPlayers();
    loadTeams();
  }, []);

  const loadPlayers = async () => {
    const response = await playerService.getAll();
    setPlayers(response.data);
  };

  const loadTeams = async () => {
    const response = await teamService.getAll();
    setTeams(response.data);
  };

  const handleOpenModal = (player: Player | null = null) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (selectedPlayer) {
        // Editar jugador
        await playerService.update(selectedPlayer.id, formData);
      } else {
        // Crear jugador
        await playerService.create(formData);
      }
      loadPlayers();
      handleCloseModal();
    } catch {
      console.error('Error al guardar el jugador.');
    }
  };

  const handleOpenConfirm = (id: number) => {
    setPlayerToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (playerToDelete) {
      try {
        await playerService.delete(playerToDelete);
        loadPlayers();
      } catch {
        console.error('Error al eliminar el jugador.');
      } finally {
        setIsConfirmOpen(false);
        setPlayerToDelete(null);
      }
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Gestión de Jugadores
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpenModal()}
      >
        Agregar Jugador
      </Button>

      {/* Tabla de jugadores */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Posición</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>CI</TableCell>
              <TableCell>Equipo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.id}>
                <TableCell>{player.id}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.age}</TableCell>
                <TableCell>{player.ci_number}</TableCell>
                <TableCell>
                  {player.team ? (
                    <>
                      {player.team.logo && (
                        <img
                          src={`${BASE_URL}${player.team.logo}`}
                          alt={player.team.name}
                          width="30"
                          style={{ marginRight: '8px', verticalAlign: 'middle' }}
                        />
                      )}
                      {player.team.name}
                    </>
                  ) : (
                    'Sin equipo'
                  )}
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenModal(player)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleOpenConfirm(player.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de agregar/editar */}
      <AddEditPlayerModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        teams={teams}
        initialData={selectedPlayer}
      />

      {/* Modal de confirmación */}
      <ConfirmationModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Eliminar Jugador"
        description="¿Estás seguro de que deseas eliminar a este jugador?"
      />
    </Box>
  );
};

export default Jugadores;