import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack, Alert } from '@mui/material';
import coachService from '../../services/coachService';

interface AddEditCoachModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  coach: { id: number; name: string; email: string; phone: string | null } | null;
}

const AddEditCoachModal: React.FC<AddEditCoachModalProps> = ({ open, onClose, onSubmit, coach }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ email: '', phone: '' });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (coach) {
      setName(coach.name);
      setEmail(coach.email);
      setPhone(coach.phone || '');
    } else {
      setName('');
      setEmail('');
      setPhone('');
    }
    setErrors({ email: '', phone: '' }); // Resetear errores
    setSuccessMessage('');
  }, [coach]);

  const validateFields = () => {
    let valid = true;
    const newErrors = { email: '', phone: '' };

    // Validación de correo
    if (!email.endsWith('@gmail.com')) {
      newErrors.email = 'El correo debe terminar con @gmail.com';
      valid = false;
    }

    // Validación de teléfono
    if (!/^\d{8}$/.test(phone)) {
      newErrors.phone = 'El teléfono debe contener exactamente 8 dígitos numéricos';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    const payload = { name, email, phone };

    try {
      if (coach) {
        await coachService.update(coach.id, payload);
      } else {
        await coachService.create(payload);
      }
      setSuccessMessage('Entrenador guardado correctamente.');
      setTimeout(() => {
        setSuccessMessage('');
        onSubmit();
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error al guardar el entrenador:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-edit-coach">
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
          {coach ? 'Editar Entrenador' : 'Agregar Entrenador'}
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Stack spacing={2}>
          <TextField
            label="Nombre"
            placeholder="Ejemplo: Juan Pérez"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            placeholder="Ejemplo: correo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
            required
          />
          <TextField
            label="Teléfono"
            placeholder="Ejemplo: 12345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            required
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Guardar
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddEditCoachModal;