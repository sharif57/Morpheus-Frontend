import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./Api/baseApi";
import { sessionApi } from "./feature/createSession";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(sessionApi.middleware),

});

export default store;
