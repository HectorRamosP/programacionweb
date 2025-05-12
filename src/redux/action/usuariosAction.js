import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const listarUsuarios = createAsyncThunk("usuarios/listarUsuarios",
    async ({rejectWhithValue}) => {
        try 
        {
            return await axios.get("URL");
        }
        catch(error)
        {
            return rejectWhithValue(error);
        }
    }
)