"use client";
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUsuario } from "../redux/slices/usuariosSlice";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuarios.usuario);

  const handleLogout = () => {
    dispatch(logoutUsuario());
    navigate("/login");
  };

  const navLinkStyle = {
    transition: "all 0.3s ease",
    color: "#ffffff",
  };

  const handleMouseEnter = (e) => {
    e.target.style.background = "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)";
    e.target.style.transform = "translateY(-2px)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.background = "transparent";
    e.target.style.transform = "translateY(0)";
  };

  return (
    <Navbar className="modern-navbar" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-3"
          style={{
            background: "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          EventosHMO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className="fw-semibold mx-2 px-3 py-2 rounded-pill"
              style={navLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/crear-evento"
              className="fw-semibold mx-2 px-3 py-2 rounded-pill"
              style={navLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Crear Evento
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/contacto"
              className="fw-semibold mx-2 px-3 py-2 rounded-pill"
              style={navLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Contacto
            </Nav.Link>

            {!usuario && (
              <>
                <Nav.Link
                  as={Link}
                  to="/crear-usuario"
                  className="fw-semibold mx-2 px-3 py-2 rounded-pill"
                  style={navLinkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Crear Cuenta
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/login"
                  className="fw-semibold mx-2 px-3 py-2 rounded-pill"
                  style={navLinkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Iniciar Sesión
                </Nav.Link>
              </>
            )}

            {usuario && (
              <Nav.Link
                onClick={handleLogout}
                className="fw-semibold mx-2 px-3 py-2 rounded-pill"
                style={navLinkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Cerrar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
