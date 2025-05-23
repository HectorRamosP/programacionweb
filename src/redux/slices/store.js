import { configureStore } from "@reduxjs/toolkit";
import { usuariosReducer } from "../slices/usuariosSlice";
import { eventosReducer } from "../slices/eventosSlice";
import { comentariosReducer } from "../slices/comentariosSlice";

export default configureStore({
  reducer: {
    usuarios: usuariosReducer,
    eventos: eventosReducer,
    comentarios: comentariosReducer,
  }
});


