// src/redux/action/usuariosAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL base para operaciones con usuarios
const API_URL = "http://localhost:5230/usuarios";

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Construir cabeceras con Authorization si hay token
const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Iniciar sesión
export const loginUsuario = createAsyncThunk(
  "usuarios/login",
  async (credenciales, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5230/login", credenciales, {
        headers: { "Content-Type": "application/json" },
      });

      const token = res.headers["authorization"];

      if (token) {
        localStorage.setItem("token", token);
      }

      return { token };
    } catch (error) {
      let mensaje = "Error al iniciar sesión.";
      if (error.response?.status === 400) {
        mensaje = Array.isArray(error.response.data)
          ? error.response.data.join(", ")
          : error.response.data;
      } else if (error.response?.status === 401) {
        mensaje = "Correo o contraseña incorrectos.";
      }
      return rejectWithValue(mensaje);
    }
  }
);

// Listar usuarios
export const listarUsuarios = createAsyncThunk(
  "usuarios/listarUsuarios",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Crear usuario
export const crearUsuario = createAsyncThunk(
  "usuarios/crearUsuario",
  async (usuarioData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, usuarioData, {
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Actualizar usuario (PUT)
export const actualizarUsuario = createAsyncThunk(
  "usuarios/actualizarUsuario",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data, {
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Modificación parcial (PATCH)
export const patchUsuario = createAsyncThunk(
  "usuarios/patchUsuario",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, data, {
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
