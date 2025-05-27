import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  loading: false,
};

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  // Simulación de datos. En producción, realiza una petición a la BD o API.
  return [
    { id: 1, title: 'Festival Cultural', date: '2025-06-01', location: 'Plaza Zaragoza', description: 'Un evento lleno de cultura.', image: '/img/evento1.jpg', attendance: 0 },
    { id: 2, title: 'Concierto Rock', date: '2025-06-02', location: 'Auditorio Cívico', description: 'Rock en vivo toda la noche.', image: '/img/evento2.jpg', attendance: 0 },
  ];
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    incrementAttendance: (state, action) => {
      const event = state.events.find(e => e.id === action.payload);
      if (event) event.attendance++;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      });
  }
});

export const { incrementAttendance } = eventsSlice.actions;
export default eventsSlice.reducer;
