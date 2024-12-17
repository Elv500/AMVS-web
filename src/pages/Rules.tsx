import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';

// Ruta del reglamento
const REGLAMENTO_PDF = '/files/reglamento-voleibol.pdf';

interface GestoArbitral {
  name: string;
  description: string;
  gif: string;
}

const gestures: GestoArbitral[] = [
  {
    name: 'Saque Incorrecto',
    description: 'El árbitro indica un saque realizado de manera incorrecta.',
    gif: 'https://media.giphy.com/media/UVr38ab5iEwtUhgCSC/giphy.gif',
  },
  {
    name: 'Toque de Red',
    description: 'El árbitro señala un toque de red por parte de un jugador.',
    gif: 'https://media.giphy.com/media/UVr38ab5iEwtUhgCSC/giphy.gif',
  },
  {
    name: 'Falta de Rotación',
    description: 'Se señala una infracción de la rotación en el equipo.',
    gif: 'https://media.giphy.com/media/UVr38ab5iEwtUhgCSC/giphy.gif',
  },
  {
    name: 'Falta de Rotación',
    description: 'Se señala una infracción de la rotación en el equipo.',
    gif: 'https://media.giphy.com/media/UVr38ab5iEwtUhgCSC/giphy.gif',
  },
  {
    name: 'Saque Incorrecto',
    description: 'El árbitro indica un saque realizado de manera incorrecta.',
    gif: 'https://media.giphy.com/media/UVr38ab5iEwtUhgCSC/giphy.gif',
  },
  {
    name: 'Toque de Red',
    description: 'El árbitro señala un toque de red por parte de un jugador.',
    gif: 'https://media.giphy.com/media/UVr38ab5iEwtUhgCSC/giphy.gif',
  },
  {
    name: 'Falta de Rotación',
    description: 'Se señala una infracción de la rotación en el equipo.',
    gif: 'https://media.giphy.com/media/UVr38ab5iEwtUhgCSC/giphy.gif',
  },
  {
    name: 'Falta de Rotación',
    description: 'Se señala una infracción de la rotación en el equipo.',
    gif: 'https://media.giphy.com/media/UVr38ab5iEwtUhgCSC/giphy.gif',
  },
];

const Rules: React.FC = () => {
  const [isReglamentoOpen, setIsReglamentoOpen] = useState(false);

  return (
    <Box p={3}>
      {/* Parte Superior */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Reglas Principales del Voleibol
        </Typography>
        <ul>
          <li>Equipos: 6 jugadores en cancha por equipo.</li>
          <li>Toques: Máximo 3 toques por equipo antes de pasar el balón.</li>
          <li>
            Puntuación: El juego es al mejor de 5 sets; los primeros 4 a 25
            puntos y el quinto a 15 puntos.
          </li>
          <li>
            Rotación: Los jugadores rotan en sentido de las agujas del reloj
            después de ganar el saque.
          </li>
          <li>Saque: Debe realizarse detrás de la línea de fondo.</li>
          <li>Faltas: Prohibido tocar la red, invadir el campo contrario o realizar dobles toques.</li>
          <li>Bloqueo: No cuenta como uno de los 3 toques permitidos.</li>
          <li>Líbero: Jugador especializado en defensa que no puede atacar ni sacar.</li>
        </ul>
        <Card sx={{ maxWidth: 300, mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Reglamento Completo
            </Typography>
            <Button
              variant="contained"
              startIcon={<Visibility />}
              color="primary"
              onClick={() => setIsReglamentoOpen(true)}
            >
              Ver Reglamento
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* Parte Inferior - Gestos Arbitrales */}
      <Box>
        <Typography variant="h4" gutterBottom>
          Gestos Arbitrales
        </Typography>
        <Grid container spacing={3}>
          {gestures.map((gesture) => (
            <Grid item xs={12} sm={6} md={3} key={gesture.name}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={gesture.gif}
                  alt={gesture.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {gesture.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {gesture.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Modal para Reglamento PDF */}
      <Modal
        open={isReglamentoOpen}
        onClose={() => setIsReglamentoOpen(false)}
        aria-labelledby="reglamento-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
          }}
        >
          <iframe
            src={REGLAMENTO_PDF}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title="Reglamento de Voleibol"
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Rules;