"use client";

import baseApi from "../Api/baseApi";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    askQuestion: builder.mutation({
      query: (data) => ({
        url: "/ai/chat/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Session"],
    }),

    // getAllChats: builder.query({
    //   query: (sessionId) => `/ai/all_chat/?session_id=${sessionId}`,
    // }),
    userChats: builder.query({
      query: (sessionId) => ({
        url: `/ai/all_chat/?session_id=${sessionId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Session"],
    }),

    createSession: builder.mutation({
      query: (data) => ({
        url: "/ai/chat_session/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Session"],
    }),

    userAllSessions: builder.query({
      query: () => ({
        url: '/ai/all_sessions/',
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Session"],
    }),

    // searchChats: builder.query({
    //   query: (chat) => ({
    //     url: `/ai/search/?q=${chat}`,
    //     // /ai/search/?q=Mehedi
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   }),
    //   providesTags: ["Session"],
    // }),
    searchChats: builder.query({
      query: (chat) => ({
        url: `/ai/search/?q=${encodeURIComponent(chat)}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Session"],
    }),

  }),
});

export const { useAskQuestionMutation, useUserChatsQuery , useCreateSessionMutation, useUserAllSessionsQuery, useSearchChatsQuery} = sessionApi;
