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
import fieldService from '../../services/fieldService';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import FeedbackModal from '../../components/modals/FeedbackModal';
import AddEditFieldModal from '../../components/modals/AddEditFieldModal';

interface Field {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

const Canchas: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    loadFields();
  }, []);

  const loadFields = async () => {
    try {
      const response = await fieldService.getAll();
      setFields(response.data);
    } catch {
      setFeedbackMessage('Error al cargar las canchas.');
    }
  };

  const handleDelete = async () => {
    if (selectedField) {
      try {
        await fieldService.delete(selectedField.id);
        setFeedbackMessage('Cancha eliminada correctamente.');
        loadFields();
      } catch {
        setFeedbackMessage('Error al eliminar la cancha.');
      } finally {
        setIsConfirmOpen(false);
      }
    }
  };

  const handleAddOrEditField = async (data: { name: string; description: string }) => {
    try {
      if (selectedField) {
        await fieldService.update(selectedField.id, data);
        setFeedbackMessage('Cancha actualizada correctamente.');
      } else {
        await fieldService.create(data);
        setFeedbackMessage('Cancha creada correctamente.');
      }
      loadFields();
    } catch {
      setFeedbackMessage('Error al guardar la cancha.');
    } finally {
      setIsModalOpen(false);
      setSelectedField(null);
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Canchas</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setSelectedField(null);
            setIsModalOpen(true);
          }}
        >
          Agregar Cancha
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha de Registro</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field) => (
              <TableRow key={field.id}>
                <TableCell>{field.id}</TableCell>
                <TableCell>{field.name}</TableCell>
                <TableCell>{field.description}</TableCell>
                <TableCell>{new Date(field.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedField(field);
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedField(field);
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
      <AddEditFieldModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddOrEditField}
        initialData={selectedField ? { name: selectedField.name, description: selectedField.description } : undefined}
      />
      <ConfirmationModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Eliminar Cancha"
        description="¿Estás seguro de eliminar esta cancha?"
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

export default Canchas;