import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import policyService from '../../services/policyService';

export const fetchPolicies = createAsyncThunk(
  'policy/fetchPolicies',
  async (_, { rejectWithValue }) => {
    try {
      return await policyService.fetchPolicies();
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const policySlice = createSlice({
  name: 'policy',
  initialState: { policies: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.loading = false;
        state.policies = action.payload;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default policySlice.reducer;
