import React from 'react';
import { Box, Button, Typography, Grid, Card, CardContent, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SportsVolleyball, Groups, Assignment, Notifications } from '@mui/icons-material';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: 'center',
        minHeight: '100vh',
        p: 4,
        background: 'linear-gradient(to right,rgb(11, 61, 105), #21CBF3)',
        color: 'white',
      }}
    >
      {/* Encabezado */}
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Bienvenido al Sistema de Gestión de Voleibol
      </Typography>
      <Typography variant="h6" sx={{ mb: 6 }}>
        Administra tus equipos, jugadores, partidos y más de forma rápida y eficiente.
      </Typography>

      {/* Botones Principales */}
      <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<SportsVolleyball />}
            onClick={() => navigate('/clubs/equipos')}
          >
            Equipos
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<Groups />}
            onClick={() => navigate('/clubs/entrenadores')}
          >
            Entrenadores
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<Assignment />}
            onClick={() => navigate('/matches/partidos-dia')}
          >
            Partidos del Dia
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<Notifications />}
            onClick={() => navigate('/noticias')}
          >
            Noticias
          </Button>
        </Grid>
      </Grid>

      {/* Sección de Tarjetas */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        Resumen General
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: '#ffffff', color: '#000', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                10
              </Typography>
              <Typography>Equipos Registrados</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: '#ffffff', color: '#000', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                25
              </Typography>
              <Typography>Jugadores Activos</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: '#ffffff', color: '#000', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                8
              </Typography>
              <Typography>Entrenadores</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: '#ffffff', color: '#000', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                15
              </Typography>
              <Typography>Partidos Programados</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pie de Página */}
      <Typography variant="subtitle1" sx={{ mt: 6, opacity: 0.8 }}>
        Sistema desarrollado para la gestión eficiente de torneos de voleibol.
      </Typography>
    </Box>
  );
};

export default Home;