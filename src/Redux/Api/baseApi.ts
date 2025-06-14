import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.18:8000",
  }),
  tagTypes: [
    "User",
    "Session",
  ],
  endpoints: () => ({}),
});

export default baseApi;
