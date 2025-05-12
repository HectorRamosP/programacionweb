import { createSlice } from "@reduxjs/toolkit";
import { listarUsuarios } from "../action/usuariosAction";
import { act } from "react";

const initialState = {
    usuarios: [],
    usuario: {},
    loading: false,
    error: null
};

const usuariosSlice = createSlice({
    name: "listarUsuarios",
    initialState,
    reducer: { },
    extraReducers: (builder) => {
        builder.
        addcCase(listarUsuarios.pending, (state) =>{
            state.loading = true;

        })
        .addcCase(listarUsuarios.fulfilled, (state, action) =>{
            state.loading = false;
            state.usuarios = action.payload;
        })
        .addcCase(listarUsuarios.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const usuariosReducer = usuariosSlice.reducer;