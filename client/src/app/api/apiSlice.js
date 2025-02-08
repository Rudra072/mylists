import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../../features/authSlice/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://mylists.onrender.com/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) //request url, method, body
  // console.log(api) //signal, dispatch, getState()
  //console.log(extraOptions) //custom like {shout: true}
  let result = await baseQuery(args, api, extraOptions);
  if (
    result?.error?.originalStatus === 403 ||
    result?.error?.originalStatus === 401
  ) {
    // console.log("sending new refresh token");
    //send refresh token to get new access token
    const refershResult = await baseQuery("auth/refresh", api, extraOptions);
    // console.log("refreshResults: ", refershResult);
    if (refershResult?.data) {
      const user = api.getState().auth.user;
      //store the new token
      api.dispatch(setCredentials({ ...refershResult.data, user }));
      //retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Tasks", "Columns"],
  endpoints: (builder) => ({}),
});
