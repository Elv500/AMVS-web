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
import { Add, Delete } from '@mui/icons-material';
import tournamentService from '../../services/tournamentService';
import AddEditTournamentModal from '../../components/modals/AddEditTournamentModal';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import FeedbackModal from '../../components/modals/FeedbackModal';

interface Tournament {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  allowed_hours_start: string;
  allowed_hours_end: string;
}

const Torneos: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async () => {
    try {
      const response = await tournamentService.getAll();
      setTournaments(response.data);
    } catch (error) {
      setFeedbackMessage('Error al cargar los torneos.');
    }
  };

  const handleDelete = async () => {
    if (selectedTournament) {
      try {
        await tournamentService.delete(selectedTournament.id);
        setFeedbackMessage('Torneo eliminado correctamente.');
        loadTournaments();
      } catch {
        setFeedbackMessage('Error al eliminar el torneo.');
      } finally {
        setIsConfirmOpen(false);
      }
    }
  };

  const handleCreate = async (data: any) => {
    try {
      await tournamentService.create(data);
      setFeedbackMessage('Torneo creado correctamente.');
      loadTournaments();
    } catch {
      setFeedbackMessage('Error al guardar el torneo.');
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <Box p={3}>
      {/* Título y Botón Agregar */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Torneos</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsModalOpen(true)}
        >
          Agregar Torneo
        </Button>
      </Box>

      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Fecha Inicio</TableCell>
              <TableCell>Fecha Fin</TableCell>
              <TableCell>Hora Inicio</TableCell>
              <TableCell>Hora Fin</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tournaments.map((tournament) => (
              <TableRow key={tournament.id}>
                <TableCell>{tournament.id}</TableCell>
                <TableCell>{tournament.name}</TableCell>
                <TableCell>{tournament.start_date}</TableCell>
                <TableCell>{tournament.end_date}</TableCell>
                <TableCell>{tournament.allowed_hours_start}</TableCell>
                <TableCell>{tournament.allowed_hours_end}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedTournament(tournament);
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
      <AddEditTournamentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
      />
      <ConfirmationModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Eliminar Torneo"
        description="¿Estás seguro de que deseas eliminar este torneo?"
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

export default Torneos;