import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Rules from '../pages/Rules';
import News from '../pages/News';

// Partidos
import GenerarPartidos from '../pages/Partidos/GenerarPartidos';
import RolPartidos from '../pages/Partidos/RolPartidos';
import TablaPosiciones from '../pages/Partidos/TablaPosiciones';
import PartidosDia from '../pages/Partidos/PartidosDia';

// Clubs
import Equipos from '../pages/Clubs/Equipos';
import Jugadores from '../pages/Clubs/Jugadores';
import Coaches from '../pages/Clubs/Entrenadores';

import EquipoDetalles from '../pages/Clubs/EquipoDetalles';
import Canchas from '../pages/Clubs/Canchas';
import Torneos from '../pages/Clubs/Torneos';

function MyRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Partidos */}
      <Route path="/matches/generar" element={<GenerarPartidos />} />
      <Route path="/matches/partidos-dia" element={<PartidosDia />} />
      <Route path="/matches/rol-partidos" element={<RolPartidos />} />
      <Route path="/matches/tabla-posiciones" element={<TablaPosiciones />} />

      {/* Clubs */}
      <Route path="/clubs/equipos" element={<Equipos />} />
      <Route path="/clubs/jugadores" element={<Jugadores />} />
      <Route path="/clubs/entrenadores" element={<Coaches />} />

      <Route path="/clubs/equipos/:id" element={<EquipoDetalles />} />
      <Route path="/clubs/canchas" element={<Canchas />} />
      <Route path="/clubs/tournaments" element={<Torneos />} />

      {/* Reglamento y Noticias */}
      <Route path="/rules" element={<Rules />} />
      <Route path="/news" element={<News />} />
    </Routes>
  );
}

export default MyRoutes;