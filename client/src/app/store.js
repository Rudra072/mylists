import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice/authSlice";
import { apiSlice } from "./api/apiSlice";
// import { persistStore, persistReducer } from "redux-persist";
// import persistConfig from "./persistConfig";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer, // Use the persisted reducer here
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// export const persistor = persistStore(store);
