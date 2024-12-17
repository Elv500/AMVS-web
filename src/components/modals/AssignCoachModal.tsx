import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, Select, MenuItem, Typography, FormControl, InputLabel } from '@mui/material';
import teamService from '../../services/teamService';
import coachService from '../../services/coachService';

interface AssignCoachModalProps {
  open: boolean;
  onClose: () => void;
  team: { id: number; name: string } | null;
  onCoachAssigned: () => void;
}

interface Coach {
  id: number;
  name: string;
}

const AssignCoachModal: React.FC<AssignCoachModalProps> = ({ open, onClose, team, onCoachAssigned }) => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [selectedCoachId, setSelectedCoachId] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      loadCoaches();
      setSelectedCoachId(null);
    }
  }, [open]);

  const loadCoaches = async () => {
    const response = await coachService.getAll();
    setCoaches(response.data || response);
  };

  const handleSave = async () => {
    if (team && selectedCoachId) {
      await teamService.update(team.id, { coach_id: selectedCoachId });
      onCoachAssigned();
    }
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
        <Typography variant="h6" mb={2}>Asignar Entrenador</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Entrenador</InputLabel>
          <Select
            value={selectedCoachId || ''}
            onChange={(e) => setSelectedCoachId(Number(e.target.value))}
            label="Entrenador"
          >
            {coaches.map((coach) => (
              <MenuItem key={coach.id} value={coach.id}>{coach.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="outlined" color="error" onClick={onClose}>Cancelar</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!selectedCoachId}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AssignCoachModal;