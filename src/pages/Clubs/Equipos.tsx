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
  IconButton,
  Typography,
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import teamService from '../../services/teamService';
import AddEditTeamModal from '../../components/modals/AddEditTeamModal';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import FeedbackModal from '../../components/modals/FeedbackModal';

interface Team {
  id: number;
  name: string;
  logo: string | null;
  players: any[]; // Array de jugadores asociados
  created_at: string; // Fecha de registro
}

const BASE_URL = 'http://localhost:8000/storage/';

const Equipos: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    setLoading(true);
    try {
      const response = await teamService.getAll();
      setTeams(response.data);
    } catch (error) {
      setFeedbackMessage('Error al cargar los equipos.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedTeam) {
      try {
        await teamService.delete(selectedTeam.id);
        setFeedbackMessage('Equipo eliminado correctamente.');
        loadTeams();
      } catch {
        setFeedbackMessage('Error al eliminar el equipo.');
      } finally {
        setIsConfirmOpen(false);
      }
    }
  };

  const handleAddOrEditTeam = async (formData: FormData) => {
    try {
      if (selectedTeam) {
        // Editar equipo
        await teamService.update(selectedTeam.id, formData);
        setFeedbackMessage('Equipo actualizado correctamente.');
      } else {
        // Crear equipo
        await teamService.create(formData);
        setFeedbackMessage('Equipo creado correctamente.');
      }
      loadTeams();
    } catch {
      setFeedbackMessage('Error al guardar el equipo.');
    } finally {
      setIsModalOpen(false);
      setSelectedTeam(null);
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Equipos</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setSelectedTeam(null); // Limpiar selección
            setIsModalOpen(true);
          }}
        >
          Agregar Equipo
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Jugadores</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Fecha de Registro</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell>{team.id}</TableCell>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.players.length}</TableCell>
                <TableCell>
                  {team.logo && (
                    <img
                      src={`${BASE_URL}${team.logo}`}
                      alt={team.name}
                      width="50"
                      height="50"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {new Date(team.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedTeam(team);
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedTeam(team);
                      setIsConfirmOpen(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modals */}
      <AddEditTeamModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddOrEditTeam}
        initialData={selectedTeam}
      />
      <ConfirmationModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Eliminar Equipo"
        description="¿Estás seguro de eliminar este equipo?"
      />
      <FeedbackModal
        open={!!feedbackMessage}
        onClose={() => setFeedbackMessage('')}
        message={feedbackMessage}
        type="success"
      />
    </Box>
  );
};

export default Equipos;