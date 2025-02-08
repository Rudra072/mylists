import { apiSlice } from "../../app/api/apiSlice";

export const boardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => "/boards",
      providesTags: ["Boards"],
    }),
    getBoard: builder.query({
      query: ({ id }) => `/boards/${id}`,
    }),
    addBoard: builder.mutation({
      query: (body) => ({
        url: "/boards",
        method: "POST",
        credentials: "include",
        body: body,
      }),
      invalidatesTags: ["Boards"],
    }),
    editBoard: builder.mutation({
      query: ({ id, body }) => ({
        url: `/boards/${id}/edit`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Boards"],
    }),
    deleteBoard: builder.mutation({
      query: ({ id }) => ({
        url: `/boards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Boards", "AllTasks"],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetBoardQuery,
  useAddBoardMutation,
  useEditBoardMutation,
  useDeleteBoardMutation,
} = boardApiSlice;
