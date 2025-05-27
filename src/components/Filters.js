import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const Filters = () => {
  return (
    <Form className="mb-4">
      <Row>
        <Col md={4}>
          <Form.Group controlId="filterLugar">
            <Form.Label>Lugar</Form.Label>
            <Form.Control type="text" placeholder="Buscar por lugar" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="filterDia">
            <Form.Label>Día</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="filterTipo">
            <Form.Label>Tipo de Evento</Form.Label>
            <Form.Control as="select">
              <option>Todos</option>
              <option>Concierto</option>
              <option>Cultural</option>
              <option>Deportivo</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
