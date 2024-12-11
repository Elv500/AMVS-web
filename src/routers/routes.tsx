import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Matches from '../pages/Matches';
import Clubs from '../pages/Clubs';
import Rules from '../pages/Rules';
import News from '../pages/News';

function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/clubs" element={<Clubs />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/news" element={<News />} />
    </Routes>
  );
}

export default MyRoutes;