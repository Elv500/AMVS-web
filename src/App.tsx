import './App.css';
import Sidebar from './components/Sidebar'; // Importa el Sidebar
import MyRoutes from './routers/routes';

function App() {
  return (
    <>
      <Sidebar /> {/* Agregamos el Sidebar */}
      <MyRoutes /> {/* Rutas de la aplicación */}
    </>
  );
}

export default App;