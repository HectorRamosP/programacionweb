// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { eventosReducer } from './slices/eventosSlice';
import { usuariosReducer } from './slices/usuariosSlice';
import { comentariosReducer } from './slices/comentariosSlice';

const store = configureStore({
  reducer: {
    eventos: eventosReducer,
    usuarios: usuariosReducer,
    comentarios: comentariosReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
