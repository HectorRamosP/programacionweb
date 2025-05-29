"use client"

import { useState } from "react"
import { Card, Button, Modal, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { incrementAttendance } from "../redux/eventsSlice"
import "./EventCard.css"

const EventCard = ({ event }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [comment, setComment] = useState("")

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleAttend = () => {
    dispatch(incrementAttendance(event.id))
  }

  const handleComment = () => {
    alert(`💬 Comentario enviado: ${comment}`)
    setComment("")
    handleClose()
  }

  return (
    <>
      <Card className="event-card">
        <Card.Img variant="top" src={event.image} className="event-image" />
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <Card.Text>
            <div className="event-date">{event.date}</div>
            <div className="event-location">📍 {event.location}</div>
          </Card.Text>

          <div className="event-buttons">
            <Button className="comment-button" onClick={handleShow} title="Ver detalles y comentar">
              💬
            </Button>

            <Button className="attendance-button" onClick={handleAttend}>
              🎉 Asistir
              <span className="attendance-count">{event.attendance}</span>
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{event.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <h6 className="text-muted mb-3">Descripción del Evento</h6>
            <p>
              {event.description ||
                "Un evento increíble que no te puedes perder. ¡Ven y disfruta de una experiencia única!"}
            </p>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="event-date">📅 {event.date}</div>
            </div>
            <div className="col-md-6">
              <div className="event-location">📍 {event.location}</div>
            </div>
          </div>

          <Form.Group>
            <Form.Label>Deja tu comentario o pregunta</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="¿Qué te parece este evento? ¿Tienes alguna pregunta?"
            />
            <Button className="comment-submit-btn mt-3" onClick={handleComment} disabled={!comment.trim()}>
              Enviar Comentario
            </Button>
          </Form.Group>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EventCard