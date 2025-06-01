import { Form, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";

const Filters = () => {
  const [filtros, setFiltros] = useState({ lugar: "", fecha: "", tipo: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedFiltros = { ...filtros, [id]: value };
    setFiltros(updatedFiltros);
    window.dispatchEvent(new CustomEvent("filtroCambio", { detail: updatedFiltros }));
  };

  return (
    <Card className="modern-card mb-5">
      <Card.Body className="p-4">
        <h5 className="fw-bold mb-4" style={{ color: "#1a1a1a" }}>
          🔍 Filtrar Eventos
        </h5>
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group controlId="lugar" className="mb-3">
                <Form.Label className="fw-semibold">📍 Lugar</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Buscar por lugar"
                  className="modern-form-control"
                  value={filtros.lugar}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="fecha" className="mb-3">
                <Form.Label className="fw-semibold">📅 Fecha</Form.Label>
                <Form.Control
                  type="date"
                  className="modern-form-control"
                  value={filtros.fecha}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="tipo" className="mb-3">
                <Form.Label className="fw-semibold">🎭 Tipo de Evento</Form.Label>
                <Form.Control
                  as="select"
                  className="modern-form-control"
                  value={filtros.tipo}
                  onChange={handleChange}
                >
                  <option>Todos los eventos</option>
                  <option>🎵 Concierto</option>
                  <option>🎨 Cultural</option>
                  <option>⚽ Deportivo</option>
                  <option>🍕 Gastronómico</option>
                  <option>🎪 Familiar</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Filters;