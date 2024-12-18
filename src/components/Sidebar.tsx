import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Home as HomeIcon,
  CalendarMonth as CalendarMonthIcon,
  TableChart as TableChartIcon,
  Event as EventIcon,
  Groups as GroupsIcon,
  Person as PersonIcon,
  SportsVolleyball as SportsIcon,
  Description as DescriptionIcon,
  Announcement as AnnouncementIcon,
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  EmojiEvents as TournamentIcon,
} from '@mui/icons-material';

// Props para controlar el sidebar desde el App.tsx
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [openPartidos, setOpenPartidos] = useState(false);
  const [openClubs, setOpenClubs] = useState(false);

  const handleTogglePartidos = () => setOpenPartidos(!openPartidos);
  const handleToggleClubs = () => setOpenClubs(!openClubs);

  return (
    <Box>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? 240 : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? 240 : 60,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
            backgroundColor: '#183153', //Color de fondo
            color: '#74C0FC', //Color del texto
          },
          '& .MuiListItemIcon-root': {
            color: '#74C0FC', // Color de iconos
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1,
          }}
        >
          <Typography variant="h6" noWrap>
            {sidebarOpen && 'Menu'}
          </Typography>
          <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
            <MenuIcon 
            sx={{color:'#74C0FC'}} //Color de Icono Menu
            />
          </IconButton>
        </Box>

        <List>
          {/* Home */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary="Inicio" />}
            </ListItemButton>
          </ListItem>

          {/* Partidos */}
          <ListItemButton onClick={handleTogglePartidos}>
            <ListItemIcon>
              <SportsIcon />
            </ListItemIcon>
            {sidebarOpen && <ListItemText primary="Partidos" />}
            {sidebarOpen && (openPartidos ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={openPartidos} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton component={Link} to="/matches/rol-partidos" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Rol de Partidos" />}
              </ListItemButton>
              <ListItemButton component={Link} to="/matches/tabla-posiciones" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <TableChartIcon />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Tabla de Posiciones" />}
              </ListItemButton>
              <ListItemButton component={Link} to="/matches/partidos-dia" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Partidos del Día" />}
              </ListItemButton>
            </List>
          </Collapse>

          {/* Clubs */}
          <ListItemButton onClick={handleToggleClubs}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            {sidebarOpen && <ListItemText primary="Clubs" />}
            {sidebarOpen && (openClubs ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={openClubs} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton component={Link} to="/clubs/equipos" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Equipos" />}
              </ListItemButton>
              <ListItemButton component={Link} to="/clubs/jugadores" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Jugadores" />}
              </ListItemButton>
              <ListItemButton component={Link} to="/clubs/entrenadores" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Entrenadores" />}
              </ListItemButton>
              {/* Nueva opción - Canchas */}
              <ListItemButton component={Link} to="/clubs/canchas" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <SportsIcon />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Canchas" />}
              </ListItemButton>
              <ListItemButton component={Link} to="/clubs/tournaments" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <TournamentIcon  />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Torneos" />}
              </ListItemButton>
            </List>
          </Collapse>

          {/* Reglamento y Gestos */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/rules">
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary="Reglamento y Gestos" />}
            </ListItemButton>
          </ListItem>

          {/* Noticias */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/news">
              <ListItemIcon>
                <AnnouncementIcon />
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary="Noticias" />}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;