"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { crearUsuario } from "../redux/action/usuariosAction"
import { Spinner, Alert, Tabs, Tab, Form, Button, Container, Card } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar"

const CrearUsuario = () => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.usuarios)
  const [activeTab, setActiveTab] = useState("login")

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [success, setSuccess] = useState(false)

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    setSuccess(false)
  }

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(crearUsuario(registerData))
    if (crearUsuario.fulfilled.match(result)) {
      setSuccess(true)
      setRegisterData({ name: "", email: "", password: "" })
    }
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    alert("¡Bienvenido! Inicio de sesión exitoso")
  }

  return (
    <>
      <NavigationBar />
      <div
        style={{
          paddingTop: "100px",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        }}
      >
        <Container className="py-5">
          <div className="text-center mb-5">
            <h1 className="gradient-text mb-3">Mi Cuenta</h1>
            <p className="lead text-muted">Inicia sesión o crea tu cuenta para acceder a todas las funciones</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-6">
              <Card className="modern-card">
                <Card.Header
                  className="text-white text-center py-4"
                  style={{
                    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                    borderRadius: "20px 20px 0 0",
                  }}
                >
                  <h4 style={{ color: "white" }}>{activeTab === "login" ? "Iniciar Sesión" : "Crear Cuenta"}</h4>
                </Card.Header>
                <Card.Body className="p-5">
                  <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-4"
                    style={{
                      borderBottom: "2px solid #e9ecef",
                    }}
                  >
                    <Tab eventKey="login" title={<span className="fw-semibold px-3">Iniciar Sesión</span>}>
                      <Form onSubmit={handleLoginSubmit} className="mt-4">
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                            className="modern-form-control"
                            placeholder="tu@email.com"
                          />
                        </Form.Group>

                        <Form.Group className="mb-4">
                          <Form.Label className="fw-semibold">Contraseña</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                            className="modern-form-control"
                            placeholder="••••••••"
                          />
                        </Form.Group>

                        <div className="text-center">
                          <Button
                            type="submit"
                            className="btn-modern-orange px-5 py-3 fs-5"
                            style={{ minWidth: "200px" }}
                          >
                            Iniciar Sesión
                          </Button>
                        </div>
                      </Form>
                    </Tab>

                    <Tab eventKey="register" title={<span className="fw-semibold px-3">Crear Cuenta</span>}>
                      <div className="mt-4">
                        {error && (
                          <Alert variant="danger" className="rounded-3">
                            {error}
                          </Alert>
                        )}
                        {success && (
                          <Alert variant="success" className="rounded-3">
                            <strong>¡Bienvenido!</strong> Tu cuenta ha sido creada exitosamente
                          </Alert>
                        )}

                        <Form onSubmit={handleRegisterSubmit}>
                          <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Nombre Completo</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={registerData.name}
                              onChange={handleRegisterChange}
                              required
                              className="modern-form-control"
                              placeholder="Tu nombre completo"
                            />
                          </Form.Group>

                          <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={registerData.email}
                              onChange={handleRegisterChange}
                              required
                              className="modern-form-control"
                              placeholder="tu@email.com"
                            />
                          </Form.Group>

                          <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Contraseña</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              value={registerData.password}
                              onChange={handleRegisterChange}
                              required
                              className="modern-form-control"
                              placeholder="Mínimo 8 caracteres"
                            />
                          </Form.Group>

                          <div className="text-center">
                            <Button
                              type="submit"
                              disabled={loading}
                              className="btn-modern-orange px-5 py-3 fs-5"
                              style={{ minWidth: "200px" }}
                            >
                              {loading ? (
                                <>
                                  <Spinner animation="border" size="sm" className="me-2" />
                                  Creando...
                                </>
                              ) : (
                                "Crear Mi Cuenta"
                              )}
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default CrearUsuario
