import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="#">EventosHMO</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#">Inicio</Nav.Link>
          <Nav.Link href="#">Eventos</Nav.Link>
          <Nav.Link href="#">Contacto</Nav.Link>
          <Nav.Link href="#">Crear Usuario</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavigationBar;
