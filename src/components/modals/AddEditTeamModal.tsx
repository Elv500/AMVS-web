import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import coachService from '../../services/coachService';

interface AddEditTeamModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  initialData?: { name: string; logo: string | null; coach_id?: number };
}

interface Coach {
  id: number;
  name: string;
  teams: any[]; // Lista de equipos asociados al entrenador
}

const AddEditTeamModal: React.FC<AddEditTeamModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [existingLogo, setExistingLogo] = useState<string | null>(null);
  const [coachId, setCoachId] = useState<number | ''>('');
  const [coaches, setCoaches] = useState<Coach[]>([]);

  useEffect(() => {
    loadCoaches();
    if (initialData) {
      setName(initialData.name);
      setCoachId(initialData.coach_id || '');
      if (initialData.logo) {
        setExistingLogo(initialData.logo); // Guardar el logo existente
      }
    } else {
      setName('');
      setCoachId('');
      setExistingLogo(null);
    }
  }, [initialData]);

  const loadCoaches = async () => {
    try {
      const response = await coachService.getAll();
      setCoaches(response);
    } catch {
      console.error('Error al cargar entrenadores.');
    }
  };

  const handleLogoChange = (file: File | null) => {
    setLogo(file);
    setExistingLogo(null); // Si sube un nuevo logo, se oculta la vista previa existente
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', name);
    if (logo) formData.append('logo', logo);
    if (coachId) formData.append('coach_id', coachId.toString());
    onSubmit(formData);
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
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          {initialData ? 'Editar Equipo' : 'Agregar Equipo'}
        </Typography>
        <TextField
          label="Nombre del Equipo"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />

        {/* Select para elegir entrenador */}
        <Select
          fullWidth
          value={coachId}
          onChange={(e) => setCoachId(Number(e.target.value))}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Seleccionar Entrenador
          </MenuItem>
          {coaches.map((coach) => (
            <MenuItem
              key={coach.id}
              value={coach.id}
              disabled={coach.teams.length > 0}
            >
              {coach.name} {coach.teams.length > 0 ? '(Asignado)' : ''}
            </MenuItem>
          ))}
        </Select>

        {/* Vista previa del logo existente */}
        {existingLogo && !logo && (
          <Box mt={2} textAlign="center">
            <Typography variant="body2" color="textSecondary">
              Logo Actual:
            </Typography>
            <img
              src={`http://localhost:8000/storage/${existingLogo}`}
              alt="Logo Actual"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'contain',
                marginTop: '10px',
              }}
            />
          </Box>
        )}

        {/* Input para subir un nuevo logo */}
        <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          {logo ? 'Cambiar Logo' : 'Subir Logo'}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => handleLogoChange(e.target.files?.[0] || null)}
          />
        </Button>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!name}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEditTeamModal;