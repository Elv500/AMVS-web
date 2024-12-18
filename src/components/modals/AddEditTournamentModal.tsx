import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';

interface AddEditTournamentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    start_date: string;
    end_date: string;
    allowed_hours_start: string;
    allowed_hours_end: string;
  }) => void;
}

const AddEditTournamentModal: React.FC<AddEditTournamentModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [allowedStart, setAllowedStart] = useState('');
  const [allowedEnd, setAllowedEnd] = useState('');

  const handleSubmit = () => {
    onSubmit({
      name,
      start_date: startDate,
      end_date: endDate,
      allowed_hours_start: allowedStart,
      allowed_hours_end: allowedEnd,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>Agregar Torneo</Typography>
        <TextField
          label="Nombre del Torneo"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Fecha de Inicio"
          type="date"
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <TextField
          label="Fecha de Fin"
          type="date"
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <TextField
          label="Hora de Inicio"
          type="time"
          fullWidth
          value={allowedStart}
          onChange={(e) => setAllowedStart(e.target.value)}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <TextField
          label="Hora de Fin"
          type="time"
          fullWidth
          value={allowedEnd}
          onChange={(e) => setAllowedEnd(e.target.value)}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!name || !startDate || !endDate || !allowedStart || !allowedEnd}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEditTournamentModal;