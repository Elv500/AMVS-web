import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Select, MenuItem, Typography } from '@mui/material';
import tournamentService from '../../services/tournamentService';
import matchService from '../../services/matchesService';

const GenerarPartidos: React.FC = () => {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<number | null>(null);
  const [startDate, setStartDate] = useState('');
  const [interval, setInterval] = useState<number>(60);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await tournamentService.getAll();
        setTournaments(response.data);
      } catch (error) {
        console.error('Error al cargar torneos:', error);
      }
    };
    fetchTournaments();
  }, []);

  const handleGenerate = async () => {
    if (!selectedTournament || !startDate || !interval) return;

    try {
      await matchService.generateSchedule({
        tournament_id: selectedTournament,
        start_date: startDate,
        interval_minutes: interval,
      });
      setFeedbackMessage('Rol de partidos generado exitosamente.');
    } catch (error) {
      console.error('Error al generar partidos:', error);
      setFeedbackMessage('Hubo un error al generar los partidos.');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Generar Rol de Partidos
      </Typography>
      <Select
        fullWidth
        displayEmpty
        value={selectedTournament || ''}
        onChange={(e) => setSelectedTournament(Number(e.target.value))}
        margin="dense"
      >
        <MenuItem value="" disabled>
          Seleccione un Torneo
        </MenuItem>
        {tournaments.map((t) => (
          <MenuItem key={t.id} value={t.id}>
            {t.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        fullWidth
        label="Fecha de Inicio"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Intervalo en Minutos"
        type="number"
        value={interval}
        onChange={(e) => setInterval(Number(e.target.value))}
        margin="normal"
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleGenerate}>
          Generar Partidos
        </Button>
      </Box>
      {feedbackMessage && (
        <Typography color="primary" mt={2}>
          {feedbackMessage}
        </Typography>
      )}
    </Box>
  );
};

export default GenerarPartidos;