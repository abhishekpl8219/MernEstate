import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSliced from '../user/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({user:userSliced});
const persistConfig={
key: 'root',
storage,
version:1,
};
const persistedReducer =  persistReducer(persistConfig,rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
console.log("value of store",store)
export const persistor  =persistStore(store);