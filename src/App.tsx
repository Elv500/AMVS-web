import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MyRoutes from './routers/routes';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className={`main-content ${sidebarOpen ? 'expanded' : 'collapsed'}`}>
        <MyRoutes />
      </main>
    </div>
  );
}

export default App;