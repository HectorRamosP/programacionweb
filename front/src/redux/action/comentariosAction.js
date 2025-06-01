import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5230/comentarios";

// Función para obtener el token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token,
    "Content-Type": "application/json",
  };
};

// GET - No necesita token
export const listarComentarios = createAsyncThunk(
  "comentarios/listarComentarios",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// POST - Crear comentario (requiere token)
export const crearComentario = createAsyncThunk(
  "comentarios/crearComentario",
  async (comentarioData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, comentarioData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// PUT - Actualizar comentario (requiere token)
export const actualizarComentario = createAsyncThunk(
  "comentarios/actualizarComentario",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// PATCH - Modificar comentario parcialmente (requiere token)
export const patchComentario = createAsyncThunk(
  "comentarios/patchComentario",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, data, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
