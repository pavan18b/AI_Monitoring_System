import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: "https://ai-monitoring-system-3.onrender.com/api",
  credentials: 'include',

  // 🔥 ADD THIS (MAIN FIX)
  prepareHeaders: (headers) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo && userInfo.token) {
      headers.set('authorization', `Bearer ${userInfo.token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Exam', 'Question'],
  endpoints: () => ({}),
});