import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
};

// Simulación de datos. En producción, usar fetch o axios hacia una API.
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return [
    { id: 1, nombre: 'Ana Pérez', correo: 'ana@example.com', rol: 'Administrador' },
    { id: 2, nombre: 'Luis García', correo: 'luis@example.com', rol: 'Usuario' },
  ];
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      });
  }
});

export const { addUser, deleteUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
