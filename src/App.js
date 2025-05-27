import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Componentes de páginas
import Home from './pages/Home';
import CrearUsuario from './pages/CrearUsuario';
// import Contacto from './pages/Contacto';
import CrearEvento from './pages/CrearEvento';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear-usuario" element={<CrearUsuario />} />
        <Route path="/crear-evento" element={<CrearEvento />} />
        {/* <Route path="/eventos" element={<Eventos />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
