import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { crearEvento } from "../redux/action/eventosAction"
import { Form, Button, Alert, Spinner, Container, Card } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar"

const CrearEvento = () => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.events)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setSuccess(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(crearEvento(formData))
    if (crearEvento.fulfilled.match(result)) {
      setSuccess(true)
      setFormData({
        title: "",
        date: "",
        location: "",
        description: "",
        image: "",
      })
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
            <h1 className="gradient-text mb-3">✨ Crear Nuevo Evento</h1>
            <p className="lead text-muted">Comparte tu evento con la comunidad de Hermosillo</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Card className="modern-card">
                <Card.Header
                  className="text-white text-center py-4"
                  style={{
                    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                    borderRadius: "20px 20px 0 0",
                  }}
                >
                  <h4 style={{ color: "white" }}>Información del Evento</h4>
                </Card.Header>
                <Card.Body className="p-5">
                  {error && (
                    <Alert variant="danger" className="rounded-3">
                      {error}
                    </Alert>
                  )}
                  {success && (
                    <Alert variant="success" className="rounded-3">
                      <strong>¡Éxito!</strong> Evento creado correctamente
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Título del Evento</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="modern-form-control"
                        placeholder="Ej: Festival de Música Rock"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Fecha del Evento</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="modern-form-control"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Ubicación</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="modern-form-control"
                        placeholder="Ej: Plaza Zaragoza, Centro de Hermosillo"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Descripción</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="modern-form-control"
                        placeholder="Describe tu evento, qué pueden esperar los asistentes..."
                      />
                    </Form.Group>

                    <Form.Group className="mb-5">
                      <Form.Label className="fw-semibold">URL de la Imagen</Form.Label>
                      <Form.Control
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="modern-form-control"
                        placeholder="https://ejemplo.com/imagen.jpg"
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
                          "Crear Evento"
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

export default CrearEvento
