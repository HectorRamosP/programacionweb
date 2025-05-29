"use client"
import React from "react"
import { Navbar, Nav, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const NavigationBar = () => (
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
            style={{
              transition: "all 0.3s ease",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)"
              e.target.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent"
              e.target.style.transform = "translateY(0)"
            }}
          >
            Inicio
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/crear-evento"
            className="fw-semibold mx-2 px-3 py-2 rounded-pill"
            style={{
              transition: "all 0.3s ease",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)"
              e.target.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent"
              e.target.style.transform = "translateY(0)"
            }}
          >
            Crear Evento
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/contacto"
            className="fw-semibold mx-2 px-3 py-2 rounded-pill"
            style={{
              transition: "all 0.3s ease",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)"
              e.target.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent"
              e.target.style.transform = "translateY(0)"
            }}
          >
            Contacto
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/crear-usuario"
            className="fw-semibold mx-2 px-3 py-2 rounded-pill"
            style={{
              transition: "all 0.3s ease",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)"
              e.target.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent"
              e.target.style.transform = "translateY(0)"
            }}
          >
            Mi Cuenta
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default NavigationBar

