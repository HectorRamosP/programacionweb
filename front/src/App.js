import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Componentes
import NavigationBar from './components/NavigationBar'; // Asegúrate de que la ruta sea correcta
import Home from './pages/Home';
import CrearUsuario from './pages/CrearUsuario';
import CrearEvento from './pages/CrearEvento';
import Login from "./pages/Login";
import Contacto from "./pages/Contacto"


function App() {
  return (
    <Router>
      <NavigationBar /> {/* <== Aquí lo agregamos */}
      <div style={{ marginTop: '80px' }}> {/* Para que el contenido no quede tapado por el navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crear-usuario" element={<CrearUsuario />} />
          <Route path="/crear-evento" element={<CrearEvento />} />
              <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
