import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { crearEvento } from "../redux/action/eventosAction"
import { Form, Button, Alert, Spinner, Container, Card } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar"
import { useNavigate } from "react-router-dom"

const CrearEvento = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error } = useSelector((state) => state.eventos)
  const usuario = useSelector((state) => state.usuarios.usuario)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!usuario) {
      navigate("/crear-evento")
    }
  }, [usuario, navigate])

  const [formData, setFormData] = useState({
    nombre: "",
    fecha: "",
    ubicacion: "",
    categoria: "",
    descripcion: "",
    urlImagen: "",
    Habilitado:true,
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
        nombre: "",
        fecha: "",
        ubicacion: "",
        categoria: "",
        descripcion: "",
        urlImagen: "",
        Habilitado:true,
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
                      <Form.Label className="fw-semibold">Nombre del Evento</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
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
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        required
                        className="modern-form-control"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Ubicación</Form.Label>
                      <Form.Control
                        type="text"
                        name="ubicacion"
                        value={formData.ubicacion}
                        onChange={handleChange}
                        required
                        className="modern-form-control"
                        placeholder="Ej: Plaza Zaragoza, Centro de Hermosillo"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Categoría</Form.Label>
                        <Form.Control
                          as="select"
                          name="categoria"
                          value={formData.categoria}
                          onChange={handleChange}
                          required
                          className="modern-form-control"
                        >
                          <option value="">Selecciona una categoría</option>
                          <option value="Concierto">🎵 Concierto</option>
                          <option value="Cultural">🎨 Cultural</option>
                          <option value="Deportivo">⚽ Deportivo</option>
                          <option value="Gastronómico">🍕 Gastronómico</option>
                          <option value="Familiar">🎪 Familiar</option>
                        </Form.Control>
                      </Form.Group>


                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Descripción</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className="modern-form-control"
                        placeholder="Describe tu evento, qué pueden esperar los asistentes..."
                      />
                    </Form.Group>

                    <Form.Group className="mb-5">
                      <Form.Label className="fw-semibold">URL de la Imagen</Form.Label>
                      <Form.Control
                        type="text"
                        name="urlImagen"
                        value={formData.urlImagen}
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
