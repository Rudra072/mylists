import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body: body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refresh: builder.query({
      query: () => ({
        url: "auth/refresh",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // const { data } = await queryFulfilled;
          // const { accessToken } = data;
          // dispatch(setCredentials({ accessToken }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    createWorkspace: builder.mutation({
      query: (body) => ({
        url: "workspace",
        method: "POST",
        credentials: "include",
        body: body,
      }),
    }),
    getUserPreference: builder.query({
      query: () => "workspace",
      providesTags: ["Preference"],
    }),
    updatePreference: builder.mutation({
      query: (body) => ({
        url: "workspace/preference",
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Preference"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useLazyRefreshQuery,
  useCreateWorkspaceMutation,
  useGetUserPreferenceQuery,
  useUpdatePreferenceMutation,
} = authApiSlice;
