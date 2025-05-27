import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crearUsuario } from '../redux/action/usuariosAction';
import { Spinner, Alert, Tabs, Tab, Form, Button, Container, Card } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';

const CrearUsuario = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.usuarios);
  const [activeTab, setActiveTab] = useState('login');

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [success, setSuccess] = useState(false);

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(crearUsuario(registerData));
    if (crearUsuario.fulfilled.match(result)) {
      setSuccess(true);
      setRegisterData({ name: '', email: '', password: '' });
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías autenticar contra un backend o servicio
    alert('Inicio de sesión simulado con:\n' + JSON.stringify(loginData, null, 2));
  };

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <Card className="shadow">
          <Card.Header className="bg-primary text-white">
            <h4>{activeTab === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</h4>
          </Card.Header>
          <Card.Body>
            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
              <Tab eventKey="login" title="Iniciar Sesión">
                <Form onSubmit={handleLoginSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />
                  </Form.Group>

                  <Button variant="success" type="submit">
                    Iniciar Sesión
                  </Button>
                </Form>
              </Tab>

              <Tab eventKey="register" title="Crear Cuenta">
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">Usuario creado correctamente</Alert>}
                <Form onSubmit={handleRegisterSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Registrarse'}
                  </Button>
                </Form>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CrearUsuario;
