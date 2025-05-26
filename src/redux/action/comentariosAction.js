import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.example.com/comentarios";

// GET
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

// POST
export const crearComentario = createAsyncThunk(
  "comentarios/crearComentario",
  async (comentarioData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, comentarioData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// PUT
export const actualizarComentario = createAsyncThunk(
  "comentarios/actualizarComentario",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// PATCH
export const patchComentario = createAsyncThunk(
  "comentarios/patchComentario",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


