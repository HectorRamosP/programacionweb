import { useState } from "react"
import { Form, Button, Alert, Container, Card, Row, Col } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar"

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setSuccess(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulación de envío
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
      setFormData({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
      })
    }, 1000)
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
            <h1 className="gradient-text mb-3">📞 Contáctanos</h1>
            <p className="lead text-muted">
              ¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte
            </p>
          </div>

          <Row className="justify-content-center">
            <Col lg={8}>
              <Row className="d-flex align-items-stretch justify-content-center">
                <Col md={4} className="mb-4 d-flex">
                  <Card className="modern-card h-100 w-100">
                    <Card.Body className="text-center p-4">
                      <div className="mb-3" style={{ fontSize: "3rem" }}>
                        📧
                      </div>
                      <h5 className="fw-bold mb-3">Email</h5>
                      <p className="text-muted">
                        info@eventoshmo.com
                        <br />
                        soporte@eventoshmo.com
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4} className="mb-4 d-flex">
                  <Card className="modern-card h-100 w-100">
                    <Card.Body className="text-center p-4">
                      <div className="mb-3" style={{ fontSize: "3rem" }}>
                        📱
                      </div>
                      <h5 className="fw-bold mb-3">Teléfono</h5>
                      <p className="text-muted">
                        +52 662 123 4567
                        <br />
                        Lun - Vie: 9:00 - 18:00
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Formulario de contacto */}
              <Card className="modern-card mt-4">
                <Card.Header
                  className="text-white text-center py-4"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                    borderRadius: "20px 20px 0 0",
                  }}
                >
                  <h4 style={{ color: "white" }}>Envíanos un Mensaje</h4>
                </Card.Header>
                <Card.Body className="p-5">
                  {success && (
                    <Alert variant="success" className="rounded-3">
                      <strong>¡Mensaje enviado!</strong> Te responderemos
                      pronto.
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-semibold">
                            Nombre Completo
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            className="modern-form-control"
                            placeholder="Tu nombre completo"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-semibold">
                            Correo Electrónico
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="modern-form-control"
                            placeholder="tu@email.com"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Asunto</Form.Label>
                      <Form.Control
                        as="select"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        required
                        className="modern-form-control"
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="consulta-general">
                          Consulta General
                        </option>
                        <option value="soporte-tecnico">Soporte Técnico</option>
                        <option value="sugerencia">Sugerencia</option>
                        <option value="colaboracion">Colaboración</option>
                        <option value="otro">Otro</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-5">
                      <Form.Label className="fw-semibold">Mensaje</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        className="modern-form-control"
                        placeholder="Escribe tu mensaje aquí..."
                      />
                    </Form.Group>

                    <div className="text-center">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="btn-modern-orange px-5 py-3 fs-5"
                        style={{ minWidth: "200px" }}
                      >
                        {loading ? "Enviando..." : "Enviar Mensaje"}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Contacto
