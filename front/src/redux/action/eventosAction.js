import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5230/eventos";

export const listarEventos = createAsyncThunk(
  "eventos/listarEventos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const crearEvento = createAsyncThunk(
  "eventos/crearEvento",
  async (eventoData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, eventoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const actualizarEvento = createAsyncThunk(
  "eventos/actualizarEvento",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const patchEvento = createAsyncThunk(
  "eventos/patchEvento",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
