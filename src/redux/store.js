import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';
import  usuariosReducer  from './slices/usersSlice';

const store = configureStore({
  reducer: {
    events: eventsReducer,
    usuarios: usuariosReducer,
  }
});

export default store;
