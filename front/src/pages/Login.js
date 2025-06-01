// src/components/Login.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUsuario } from "../redux/action/usuariosAction";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Spinner, Container, Row, Col } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Correo, setCorreo] = useState("");
  const [Contraseña, setContraseña] = useState("");

  const { usuario, loading, error } = useSelector((state) => state.usuarios);

  useEffect(() => {
    if (usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUsuario({ Correo, Contraseña, MantenerSesion: true }));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h3 className="mb-4 text-center">Iniciar Sesión</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading && <Spinner animation="border" />}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                value={Correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={Contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              Iniciar Sesión
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
