import { current } from "immer";
import { apiSlice } from "../../app/api/apiSlice";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: ({ id, columnId }) => `/boards/${id}/columns/${columnId}/tasks`,
      providesTags: ["Tasks"],
    }),
    getAllTasks: builder.query({
      query: () => `/boards/tasks`,
      providesTags: ["AllTasks"],
    }),
    updateTaskOrder: builder.mutation({
      query: ({ tasks, startIndex, endIndex, id, columnId, filters }) => ({
        url: `/boards/${id}/columns/${columnId}/tasks/reorder`,
        method: "PATCH",
        body: { tasks, startIndex, endIndex, id, columnId },
      }),
      invalidatesTags: ["Columns"],
      async onQueryStarted(
        { tasks, startIndex, endIndex, id, columnId, filters },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          taskApiSlice.util.updateQueryData(
            "getColumns",
            { id, filters }, //ColumnId was here in place of filters
            (draft) => {
              const column = draft.find((c) => c._id === columnId);
              const tasks = column.tasks;
              const [removed] = tasks.splice(startIndex, 1);
              tasks.splice(endIndex, 0, removed);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    addTask: builder.mutation({
      query: ({ id, columnId, body }) => ({
        url: `/boards/${id}/columns/${columnId}/tasks`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Columns"],
      async onQueryStarted(
        { id, columnId, body },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          taskApiSlice.util.updateQueryData(
            "getTasks",
            { id, columnId },
            (draft) => {
              // draft.push(body);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTask: builder.mutation({
      query: ({ id, columnId, taskColumnId }) => ({
        url: `/boards/${id}/columns/${columnId}/tasks/${taskColumnId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Columns"],
      async onQueryStarted(
        { id, columnId, taskColumnId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          taskApiSlice.util.updateQueryData(
            "getTasks",
            { id, columnId },
            (draft) => {
              const taskIndex = draft.findIndex((t) => t._id === taskColumnId);
              draft.splice(taskIndex, 1);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    editTask: builder.mutation({
      query: ({ id, columnId, taskId, body }) => ({
        url: `/boards/${id}/columns/${columnId}/tasks/${taskId}/edit`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Columns"],
      async onQueryStarted(
        { id, columnId, taskId, body },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          taskApiSlice.util.updateQueryData(
            "getTasks",
            { id, columnId },
            (draft) => {
              const task = draft.find((t) => t._id === taskId);
              if (task) {
                const { estimate, priority, tag, description } = body;
                task.estimate = estimate;
                task.priority = priority;
                task.tag = tag;
                task.description = description;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTasksQuery,
  useUpdateTaskOrderMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
} = taskApiSlice;
