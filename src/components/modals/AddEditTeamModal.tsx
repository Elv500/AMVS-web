import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';

interface AddEditTeamModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  initialData?: { name: string; logo: string | null }; // Datos precargados para edición
}

const AddEditTeamModal: React.FC<AddEditTeamModalProps> = ({ open, onClose, onSubmit, initialData }) => {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [existingLogo, setExistingLogo] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string | null>(null); // Nuevo estado para mostrar el nombre del archivo

  // Cargar datos iniciales si existen (para edición)
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      if (initialData.logo) {
        setExistingLogo(initialData.logo); // Guardar la URL del logo existente
      }
    }
  }, [initialData]);

  const handleLogoChange = (file: File | null) => {
    setLogo(file);
    setLogoName(file ? file.name : null); // Guardar el nombre del archivo subido
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', name);
    if (logo) {
      formData.append('logo', logo);
    }
    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setName('');
    setLogo(null);
    setLogoName(null);
    setExistingLogo(null);
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
        <Typography variant="h6" mb={2}>
          {initialData ? 'Editar Equipo' : 'Agregar Equipo'}
        </Typography>
        <TextField
          label="Nombre del Equipo"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        {/* Vista previa del logo existente */}
        {existingLogo && !logo && (
          <Box mb={2} textAlign="center">
            <Typography variant="body2" color="textSecondary">
              Logo Actual:
            </Typography>
            <img
              src={`http://localhost:8000/storage/${existingLogo}`}
              alt="Logo Actual"
              style={{ width: '100px', height: '100px', objectFit: 'contain', marginTop: '10px' }}
            />
          </Box>
        )}
        {/* Input para subir nuevo logo */}
        <Button variant="outlined" component="label" fullWidth>
          {logo ? 'Cambiar Logo' : 'Subir Logo'}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => handleLogoChange(e.target.files?.[0] || null)}
          />
        </Button>
        {logoName && (
          <Typography variant="body2" mt={1} color="textSecondary">
            Archivo: {logoName}
          </Typography>
        )}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!name}
          >
            {initialData ? 'Guardar Cambios' : 'Guardar Equipo'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEditTeamModal;