import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import FeedbackModal from '../../components/modals/FeedbackModal';
import coachService from '../../services/coachService';
import AddEditCoachModal from '../../components/modals/AddEditCoachModal';

interface Coach {
  id: number;
  name: string;
  email: string;
  phone: string | null;
}

const Entrenadores: React.FC = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');

  // Fetch all coaches
  const fetchCoaches = async () => {
    try {
      const response = await coachService.getAll();
      setCoaches(response.data || response);
    } catch {
      setFeedbackMessage('Error al cargar los entrenadores.');
      setFeedbackType('error');
      setFeedbackOpen(true);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  // Open modal to add or edit coach
  const handleAddEdit = (coach: Coach | null = null) => {
    setSelectedCoach(coach);
    setIsAddEditOpen(true);
  };

  // Confirm delete coach
  const handleDelete = (coach: Coach) => {
    setSelectedCoach(coach);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCoach) return;

    try {
      await coachService.delete(selectedCoach.id);
      setFeedbackMessage('Entrenador eliminado correctamente.');
      setFeedbackType('success');
      fetchCoaches();
    } catch {
      setFeedbackMessage('Error al eliminar el entrenador.');
      setFeedbackType('error');
    } finally {
      setIsConfirmOpen(false);
      setFeedbackOpen(true);
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Entrenadores</Typography>
        <Button variant="contained" startIcon={<Add />} color="primary" onClick={() => handleAddEdit()}>
          Agregar Entrenador
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coaches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay entrenadores registrados.
                </TableCell>
              </TableRow>
            ) : (
              coaches.map((coach) => (
                <TableRow key={coach.id}>
                  <TableCell>{coach.id}</TableCell>
                  <TableCell>{coach.name}</TableCell>
                  <TableCell>{coach.email}</TableCell>
                  <TableCell>{coach.phone || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleAddEdit(coach)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(coach)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Modal */}
      <AddEditCoachModal
        open={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        onSubmit={fetchCoaches}
        coach={selectedCoach}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar Entrenador"
        description="¿Está seguro de que desea eliminar este entrenador?"
      />

      {/* Feedback Modal */}
      <FeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        message={feedbackMessage}
        type={feedbackType}
      />
    </Box>
  );
};

export default Entrenadores;