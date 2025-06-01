// src/components/EventWithCommentsModal.js
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listarComentarios } from "../redux/action/comentariosAction";
import FormAgregarComentarios from "./FormAgregarComentarios";

const EventCard = ({ show, onHide, evento }) => {
  const dispatch = useDispatch();
  const { comentarios = [], loading, error } = useSelector((state) => state.comentarios);

  useEffect(() => {
    if (show) {
      dispatch(listarComentarios({ eventoId: evento.id }));
    }
  }, [dispatch, show, evento.id]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{evento.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Categoría:</strong> {evento.categoria}</p>
        <p><strong>Fecha:</strong> {new Date(evento.fecha).toLocaleString()}</p>
        <p><strong>Ubicación:</strong> {evento.ubicacion}</p>
        <p><strong>Descripción:</strong> {evento.descripcion || "Sin descripción"}</p>

        <hr />

        <h5>Comentarios</h5>
        {loading && <p>Cargando comentarios...</p>}
        {error && <p className="text-danger">Error: {error}</p>}
        {!loading && comentarios.length === 0 && <p className="text-muted">No hay comentarios aún.</p>}

        {comentarios.map((c) => (
          <div key={c.slug} className="mb-3 pb-2 border-bottom">
            <p>{c.descripcion}</p>
            <small className="text-secondary">
              Usuario ID: {c.usuarioId} &nbsp;–&nbsp; Habilitado: {c.habilitado ? "Sí" : "No"}
            </small>
          </div>
        ))}

        <hr />

        <FormAgregarComentarios eventoId={evento.id} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventCard;
