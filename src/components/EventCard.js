import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { incrementAttendance } from '../redux/eventsSlice';
import './EventCard.css';


const EventCard = ({ event }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAttend = () => {
    dispatch(incrementAttendance(event.id));
  };

  const handleComment = () => {
    alert(`Comentario enviado: ${comment}`);
    setComment('');
  };

  return (
    <>
      <Card>
        <Card.Img variant="top" src={event.image} />
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <Card.Text>{event.date} - {event.location}</Card.Text>
          <Button variant="primary" onClick={handleShow}>Ver más</Button>{' '}
          <Button variant="success" onClick={handleAttend}>Asistir ({event.attendance})</Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{event.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{event.description}</p>
          <Form.Group>
            <Form.Label>Comentario o Pregunta</Form.Label>
            <Form.Control 
              type="text" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              placeholder="Escribe algo..." 
            />
            <Button className="mt-2" variant="primary" onClick={handleComment}>Enviar</Button>
          </Form.Group>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EventCard;
