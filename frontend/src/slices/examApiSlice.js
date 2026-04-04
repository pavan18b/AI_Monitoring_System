import { apiSlice } from './apiSlice';

const EXAM_URL = '/exams';

export const examApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ CREATE EXAM
    createExam: builder.mutation({
      query: (data) => ({
        url: EXAM_URL,
        method: 'POST',
        body: data,
      }),
    }),

    // ✅ GET EXAMS
    getExams: builder.query({
      query: () => ({
        url: EXAM_URL,
        method: 'GET',
      }),
    }),

    // ✅ CREATE QUESTION
    createQuestion: builder.mutation({
      query: (data) => ({
        url: '/users/questions',
        method: 'POST',
        body: data,
      }),
    }),

    // 🔥 ✅ FIXED (IMPORTANT)
    getQuestions: builder.query({
      query: (examId) => ({
        url: `/users/questions/${examId}`, // ✅ CORRECT ENDPOINT
        method: 'GET',
      }),
    }),

  }),
});

export const {
  useCreateExamMutation,
  useGetExamsQuery,
  useCreateQuestionMutation,
  useGetQuestionsQuery, // ✅ USED IN TEST PAGE
} = examApiSlice;