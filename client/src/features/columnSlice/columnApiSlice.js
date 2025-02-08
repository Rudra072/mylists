import { apiSlice } from "../../app/api/apiSlice";
import { current } from "immer";
export const columnApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getColumns: builder.query({
      query: ({ id, filters }) => {
        return {
          url: `/boards/${id}/columns/${filters}`,
        };
      },
      providesTags: ["Columns"],
    }),
    updateColumnOrder: builder.mutation({
      query: ({ columns, startIndex, endIndex, id, filters }) => ({
        url: `/boards/${id}/columns/reorder`,
        method: "PATCH",
        body: { columns, startIndex, endIndex },
      }),
      async onQueryStarted(
        { columns, startIndex, endIndex, id, filters },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          columnApiSlice.util.updateQueryData(
            "getColumns",
            { id, filters },
            (draft) => {
              const [removed] = draft.splice(startIndex, 1);
              draft.splice(endIndex, 0, removed);
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
    handleDragOverColumn: builder.mutation({
      query: ({
        sourceColumnIndex,
        destColumnIndex,
        sourceTaskIndex,
        destTaskIndex,
        id,
        filters,
        columnId,
      }) => ({
        url: `/boards/${id}/columns/${columnId}/tasks/overcolumn`,
        method: "PATCH",
        body: {
          sourceColumnIndex,
          destColumnIndex,
          sourceTaskIndex,
          destTaskIndex,
          id,
          filters,
          columnId,
        },
      }),
      invalidatesTags: ["Columns", "Tasks"],
      async onQueryStarted(
        {
          sourceColumnIndex,
          destColumnIndex,
          sourceTaskIndex,
          destTaskIndex,
          id,
          filters,
          columnId,
        },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          columnApiSlice.util.updateQueryData(
            "getColumns",
            { id, filters },
            (draft) => {
              const destColumn = draft[destColumnIndex].tasks;
              const sourceColumn = draft[sourceColumnIndex].tasks;
              const [removedTask] = sourceColumn.splice(sourceTaskIndex, 1);
              destColumn.splice(destTaskIndex, 0, removedTask);
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
    addColumn: builder.mutation({
      query: ({ id, body }) => ({
        url: `/boards/${id}/columns`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Columns"],
      async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          columnApiSlice.util.updateQueryData("getColumns", id, (draft) => {
            draft.push(body);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteColumn: builder.mutation({
      query: ({ id, taskColumnId }) => ({
        url: `/boards/${id}/columns/${taskColumnId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Columns", "Tasks"],
      async onQueryStarted({ id, taskColumnId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          columnApiSlice.util.updateQueryData("getColumns", id, (draft) => {
            const columnIndex = draft.findIndex((c) => c._id === taskColumnId);
            draft.splice(columnIndex, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    editColumn: builder.mutation({
      query: ({ id, filters, columnId, body }) => ({
        url: `/boards/${id}/columns/${columnId}/edit`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Columns"],
      async onQueryStarted(
        { id, columnId, body, filters },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          columnApiSlice.util.updateQueryData(
            "getColumns",
            { id, filters },
            (draft) => {
              const { title } = body;
              const column = draft.find((c) => c._id === columnId);
              column.title = title;
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
  useGetColumnsQuery,
  useUpdateColumnOrderMutation,
  useHandleDragOverColumnMutation,
  useAddColumnMutation,
  useDeleteColumnMutation,
  useEditColumnMutation,
} = columnApiSlice;
