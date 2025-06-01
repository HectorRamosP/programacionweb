import { createSlice } from "@reduxjs/toolkit";
import {
  listarEventos,
  crearEvento,
  actualizarEvento,
  patchEvento,
} from "../action/eventosAction";

const initialState = {
  eventos: [],
  evento: {},
  loading: false,
  error: null,
};

const eventosSlice = createSlice({
  name: "eventos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Listar eventos
      .addCase(listarEventos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listarEventos.fulfilled, (state, action) => {
        state.loading = false;
        state.eventos = action.payload;
         console.log("EVENTOS CARGADOS EN REDUCER:", action.payload);
      })
      .addCase(listarEventos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Crear evento
      .addCase(crearEvento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(crearEvento.fulfilled, (state, action) => {
        state.loading = false;
        state.eventos.push(action.payload);
      })
      .addCase(crearEvento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Actualizar evento (PUT)
      .addCase(actualizarEvento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actualizarEvento.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.eventos.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) state.eventos[index] = action.payload;
      })
      .addCase(actualizarEvento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Parchear evento (PATCH)
      .addCase(patchEvento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchEvento.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.eventos.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.eventos[index] = {
            ...state.eventos[index],
            ...action.payload,
          };
        }
      })
      .addCase(patchEvento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const eventosReducer = eventosSlice.reducer;
