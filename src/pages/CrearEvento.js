import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crearEvento } from '../redux/action/eventosAction';
import { Form, Button, Alert, Spinner, Container, Card } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';

const CrearEvento = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.events);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    image: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await dispatch(crearEvento(formData));
    if (crearEvento.fulfilled.match(result)) {
      setSuccess(true);
      setFormData({
        title: '',
        date: '',
        location: '',
        description: '',
        image: ''
      });
    }
  };

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <Card className="shadow">
          <Card.Header className="bg-info text-white">
            <h4>Crear Evento</h4>
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Evento creado correctamente</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Lugar</Form.Label>
                <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>URL Imagen</Form.Label>
                <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Crear Evento'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CrearEvento;
