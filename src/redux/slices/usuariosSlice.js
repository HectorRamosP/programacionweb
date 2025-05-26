import { createSlice } from "@reduxjs/toolkit";
import {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  patchUsuario
} from "../action/usuariosAction";

const initialState = {
  usuarios: [],
  usuario: {},
  loading: false,
  error: null,
};

const usuariosSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Listar
      .addCase(listarUsuarios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listarUsuarios.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios = action.payload;
      })
      .addCase(listarUsuarios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Crear
      .addCase(crearUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(crearUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios.push(action.payload);
      })
      .addCase(crearUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

   
      .addCase(actualizarUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actualizarUsuario.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.usuarios.findIndex(u => u.id === action.payload.id);
        if (index !== -1) state.usuarios[index] = action.payload;
      })
      .addCase(actualizarUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

   
      .addCase(patchUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchUsuario.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.usuarios.findIndex(u => u.id === action.payload.id);
        if (index !== -1) state.usuarios[index] = {
          ...state.usuarios[index],
          ...action.payload,
        };
      })
      .addCase(patchUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const usuariosReducer = usuariosSlice.reducer;
