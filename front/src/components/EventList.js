// src/components/EventList.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarEventos } from "../redux/action/eventosAction";
import { Spinner, Alert, Card, Row, Col, Button } from "react-bootstrap";
import EventCard from "./EventCard";

const EventList = () => {
  const dispatch = useDispatch();
  const { eventos = [], loading, error } = useSelector((state) => state.eventos);

  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(listarEventos());
  }, [dispatch]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <Row>
        {eventos.map((evento) => (
          <Col md={4} key={evento.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={evento.urlImagen} />
              <Card.Body>
                <Card.Title>{evento.nombre}</Card.Title>
                <Card.Text>{evento.categoria}</Card.Text>
                <small className="text-muted d-block mb-2">
                  Fecha: {new Date(evento.fecha).toLocaleDateString()} <br />
                  Ubicación: {evento.ubicacion}
                </small>
                <Button
                  variant="primary"
                  onClick={() => {
                    setEventoSeleccionado(evento);
                    setShowModal(true);
                  }}
                >
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {eventoSeleccionado && (
        <EventCard
          show={showModal}
          onHide={() => setShowModal(false)}
          evento={eventoSeleccionado}
        />
      )}
    </>
  );
};

export default EventList;
