import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, TextField, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface AddEditPlayerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  teams: any[];
  initialData?: any;
}

const AddEditPlayerModal: React.FC<AddEditPlayerModalProps> = ({
  open,
  onClose,
  onSubmit,
  teams,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    age: '',
    ci_number: '',
    team_id: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        position: initialData.position || '',
        age: initialData.age || '',
        ci_number: initialData.ci_number || '',
        team_id: initialData.team?.id || '',
      });
    } else {
      setFormData({
        name: '',
        position: '',
        age: '',
        ci_number: '',
        team_id: '',
      });
    }
  }, [initialData]);

  // Manejar cambios en inputs (TextField)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Manejar cambios en Select
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" mb={2}>
          {initialData ? 'Editar Jugador' : 'Agregar Jugador'}
        </Typography>
        <TextField
          name="name"
          label="Nombre Completo"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <Select
          name="position"
          fullWidth
          value={formData.position}
          onChange={handleSelectChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Seleccionar Posición
          </MenuItem>
          {['Punta', 'Servidor', 'Opuesto', 'Central', 'Libero'].map((pos) => (
            <MenuItem key={pos} value={pos}>
              {pos}
            </MenuItem>
          ))}
        </Select>
        <TextField
          name="age"
          label="Edad"
          fullWidth
          type="number"
          value={formData.age}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          name="ci_number"
          label="CI"
          fullWidth
          value={formData.ci_number}
          onChange={handleChange}
          margin="normal"
        />
        <Select
          name="team_id"
          fullWidth
          value={formData.team_id}
          onChange={handleSelectChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Seleccionar Equipo
          </MenuItem>
          {teams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={onClose} color="error">
            Cancelar
          </Button>
          <Button onClick={() => onSubmit(formData)} variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEditPlayerModal;