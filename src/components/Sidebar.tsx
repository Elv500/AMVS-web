import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Drawer, Button, List } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;

  const drawerContent = (
    <Box sx={{ width: drawerWidth, p: 2, backgroundColor: '#000', color: '#fff', height: '100%' }}>
      <List>
        <Button component={Link} to="/home" fullWidth sx={{ color: '#fff' }}>
          Home
        </Button>
        <Button component={Link} to="/clubs" fullWidth sx={{ color: '#fff' }}>
          Equipos
        </Button>
        <Button component={Link} to="/matches" fullWidth sx={{ color: '#fff' }}>
          Partidos
        </Button>
        <Button component={Link} to="/news" fullWidth sx={{ color: '#fff' }}>
          Noticias
        </Button>
        <Button component={Link} to="/rules" fullWidth sx={{ color: '#fff' }}>
          Reglamento
        </Button>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#000', // Cambia el color del AppBar aquí
          color: '#fff',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Gestión de Torneos
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejor rendimiento en móvil
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#000', // Cambia el fondo del Drawer aquí
            color: '#fff', // Cambia el color del texto del Drawer
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#000', // Cambia el fondo del Drawer aquí
            color: '#fff', // Cambia el color del texto del Drawer
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography>Aquí se cargará el contenido dinámico de cada página.</Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;