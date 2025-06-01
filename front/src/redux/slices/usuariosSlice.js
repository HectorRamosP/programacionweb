// src/redux/slice/usuariosSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  patchUsuario,
  loginUsuario,
} from "../action/usuariosAction";

// Manejo seguro de localStorage
let parsedUsuario = null;
try {
  const stored = localStorage.getItem("usuario");
  if (stored) {
    parsedUsuario = JSON.parse(stored);
  }
} catch (e) {
  console.error("Error al parsear 'usuario' desde localStorage:", e);
}

const initialState = {
  usuarios: [],
  usuario: parsedUsuario,
  loading: false,
  error: null,
};

const usuariosSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
    logoutUsuario: (state) => {
      state.usuario = null;
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Listar usuarios
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

      // Crear usuario
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
        if (action.payload?.mensaje?.includes("correo ya está registrado")) {
          state.error = "Ese correo electrónico ya está registrado.";
        } else {
          state.error = action.payload || "Error al crear el usuario.";
        }
      })

      // Actualizar usuario (PUT)
      .addCase(actualizarUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actualizarUsuario.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.usuarios.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.usuarios[index] = action.payload;
        }
      })
      .addCase(actualizarUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Modificación parcial (PATCH)
      .addCase(patchUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchUsuario.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.usuarios.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.usuarios[index] = {
            ...state.usuarios[index],
            ...action.payload,
          };
        }
      })
      .addCase(patchUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login con persistencia
      .addCase(loginUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.usuario = action.payload;
        localStorage.setItem("usuario", JSON.stringify(action.payload));
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUsuario } = usuariosSlice.actions;
export const usuariosReducer = usuariosSlice.reducer;
