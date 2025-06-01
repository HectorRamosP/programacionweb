import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { crearUsuario } from "../redux/action/usuariosAction"
import {
  Spinner,
  Alert,
  Tabs,
  Tab,
  Form,
  Button,
  Container,
  Card,
} from "react-bootstrap"
import NavigationBar from "../components/NavigationBar"

const CrearUsuario = () => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.usuarios)
  const [activeTab, setActiveTab] = useState("register")

  const [registerData, setRegisterData] = useState({
    nombre: "",
    Correo: "",
    Contraseña: "",
    habilitado:true,
  })

  const [success, setSuccess] = useState(false)

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    })
    setSuccess(false)
  }

  const handleRegisterSubmit = async (e) => {
  e.preventDefault()
  try {
    const result = await dispatch(crearUsuario(registerData)).unwrap()
    setSuccess(true)
    setRegisterData({ nombre: "", Correo: "", Contraseña: "" })
  } catch (error) {
    
    const mensaje = error?.message || "Error al crear la cuenta. Intenta más tarde."
    alert(mensaje)  
  }
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
            <h1 className="gradient-text mb-3">Crear Cuenta</h1>
            <p className="lead text-muted">
              Regístrate para poder comentar y participar en los eventos
            </p>
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
                  <h4 style={{ color: "white" }}>Crear Cuenta</h4>
                </Card.Header>
                <Card.Body className="p-5">
                  {error && (
                    <Alert variant="danger" className="rounded-3">
                      <strong>¡Error!</strong> No se pudo crear la cuenta
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
                        name="nombre"
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
                        name="Correo"
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
                        name="Contraseña"
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
