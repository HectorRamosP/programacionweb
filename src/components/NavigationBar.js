import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="#">EventosHMO</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto">s
          <Nav.Link as={Link} to='/'>Inicio</Nav.Link>
          <Nav.Link as={Link} to="/crear-evento">Crear Evento</Nav.Link>
          <Nav.Link href="#">Contacto</Nav.Link>
          <Nav.Link as={Link} to="/crear-usuario">Crear Usuario</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavigationBar;
