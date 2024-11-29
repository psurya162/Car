import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import leadService from '../../services/leadService';

export const createLead = createAsyncThunk(
  'lead/createLead',
  async (leadData, { rejectWithValue }) => {
    try {
      return await leadService.createLead(leadData);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const leadSlice = createSlice({
  name: 'lead',
  initialState: { loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leadSlice.reducer;
