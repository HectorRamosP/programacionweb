import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { crearComentario, listarComentarios } from "../redux/action/comentariosAction";

const FormAgregarComentarios = () => {
  const { eventoId } = useParams(); // ← Lo toma desde la URL como string
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuarios.usuario);
  const [texto, setTexto] = useState("");

  const handleEnviar = async () => {
    if (!texto.trim()) return;

console.log("Usuario en Redux:", usuario);
    if (!usuario?.id) {
      alert("Debes iniciar sesión para comentar.");
      return;
    }

    const payload = {
      descripcion: texto.trim(),
      habilitado: true,
      eventoId: parseInt(eventoId), // ← Convertimos a número
      usuarioId: usuario.id
    };

    const result = await dispatch(crearComentario(payload));
    if (crearComentario.fulfilled.match(result)) {
      dispatch(listarComentarios({ eventoId: parseInt(eventoId) }));
      setTexto("");
    } else {
      alert("Error al crear comentario: " + JSON.stringify(result.payload || result.error));
    }
  };

  return (
    <div>
      <textarea
        rows={3}
        className="form-control mb-2"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe tu comentario..."
      />
      <button className="btn btn-primary" onClick={handleEnviar}>
        Enviar comentario
      </button>
    </div>
  );
};

export default FormAgregarComentarios;
