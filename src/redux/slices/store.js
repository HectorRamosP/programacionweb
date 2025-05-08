import { configureStore } from "@reduxjs/toolkit";
import { usuariosReducer } from "../slices/usuariosSlice";

export default configureStore({
    reducer :{
        listarUsuarios: usuariosReducer
    }
})