import React,{lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Welcomescreen from "./pages/Welcomescreen";
import "./index.css";
// import Signup from "./components/auth/Signup";
// import Login from "./components/auth/Login";
// import Dashboard from "./pages/Dashboard";
// import Workspace from "./pages/Workspace";
// import Homescreen from "./components/DashBoard/Homescreen";
import { store } from "./app/store";
import { Provider } from "react-redux";
import PersistLogin from "./components/auth/PersistLogin";
import { NextUIProvider } from "@nextui-org/react";
// import ListView from "./components/MainWorkSpace/ListView";
import Spinner from "./assets/Spinner";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistor } from "./app/store";

//HAVING LAZY LOADS TO REDUCE TIME WAIT AND PERFORMANCE IG 
const Welcomescreen = lazy(() => import("./pages/Welcomescreen"));
const Signup = lazy(() => import("./components/auth/Signup"));
const Login = lazy(() => import("./components/auth/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Workspace = lazy(() => import("./pages/Workspace"));
const Homescreen = lazy(() => import("./components/DashBoard/Homescreen"));
const ListView = lazy(() => import("./components/MainWorkSpace/ListView"));

const router = createBrowserRouter([
  {
    element: <PersistLogin />,
    children: [
      {
        path: "",
        element: <Welcomescreen />,
      },
      {
        path: "/spinner",
        element: <Spinner />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,

        children: [
          {
            path: "",
            element: <Homescreen />,
          },

          {
            path: ":id",
            element: <Workspace />,
          },
          {
            path: ":id/listview",
            element: <ListView />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
]);

try {
  ReactDOM.createRoot(document.getElementById("root")).render(

    //<React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <NextUIProvider>
            <RouterProvider router={router} />
        </NextUIProvider>
        {/* </PersistGate> */}
      </Provider>
   </Suspense>
    //</React.StrictMode>
  );
} catch (error) {
  console.error("Error rendering the app:", error);
}
