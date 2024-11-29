import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import policyReducer from './slices/policySlice';
import leadReducer from './slices/leadSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    policy: policyReducer,
    lead: leadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for handling non-serializable data like FormData
    }),
});

export default store;
