import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Rules from '../pages/Rules';
import News from '../pages/News';

// Partidos
import RolPartidos from '../pages/Partidos/RolPartidos';
import TablaPosiciones from '../pages/Partidos/TablaPosiciones';
import PartidosDia from '../pages/Partidos/PartidosDia';

// Clubs
import Equipos from '../pages/Clubs/Equipos';
import Jugadores from '../pages/Clubs/Jugadores';

function MyRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Partidos */}
      <Route path="/matches/partidos-dia" element={<PartidosDia />} />
      <Route path="/matches/rol-partidos" element={<RolPartidos />} />
      <Route path="/matches/tabla-posiciones" element={<TablaPosiciones />} />

      {/* Clubs */}
      <Route path="/clubs/equipos" element={<Equipos />} />
      <Route path="/clubs/jugadores" element={<Jugadores />} />

      {/* Reglamento y Noticias */}
      <Route path="/rules" element={<Rules />} />
      <Route path="/news" element={<News />} />
    </Routes>
  );
}

export default MyRoutes;