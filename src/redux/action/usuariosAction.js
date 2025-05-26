import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.example.com/usuarios";


export const listarUsuarios = createAsyncThunk(
  "usuarios/listarUsuarios",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const crearUsuario = createAsyncThunk(
  "usuarios/crearUsuario",
  async (usuarioData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, usuarioData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const actualizarUsuario = createAsyncThunk(
  "usuarios/actualizarUsuario",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const patchUsuario = createAsyncThunk(
  "usuarios/patchUsuario",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
