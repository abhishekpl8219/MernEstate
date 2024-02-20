import { configureStore } from '@reduxjs/toolkit';
import userSliced from '../user/userSlice';

export const store = configureStore({
  reducer: { user: userSliced.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});