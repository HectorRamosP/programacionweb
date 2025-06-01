
import { createSlice } from "@reduxjs/toolkit";
import {
  listarComentarios,
  crearComentario,
  actualizarComentario,
  patchComentario,
  eliminarComentario
} from "../action/comentariosAction";

const initialState = {
  comentarios: [],
  comentario: {},
  loading: false,
  error: null,
};

const comentariosSlice = createSlice({
  name: "comentarios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET
      .addCase(listarComentarios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listarComentarios.fulfilled, (state, action) => {
        state.loading = false;
        state.comentarios = action.payload;
      })
      .addCase(listarComentarios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(crearComentario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(crearComentario.fulfilled, (state, action) => {
        state.loading = false;
        state.comentarios.push(action.payload);
      })
      .addCase(crearComentario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(actualizarComentario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actualizarComentario.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.comentarios.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.comentarios[index] = action.payload;
      })
      .addCase(actualizarComentario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(patchComentario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchComentario.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.comentarios.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.comentarios[index] = {
            ...state.comentarios[index],
            ...action.payload
          };
        }
      })
      .addCase(patchComentario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


  }
});

export const comentariosReducer = comentariosSlice.reducer;