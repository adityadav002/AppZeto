/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App.jsx";
import "./index.css";

import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

import PublicRoute from "./components/routes/PublicRoute.jsx";
import PrivateRoute from "./components/routes/PrivateRoute.jsx";
import AdminRoute from "./components/routes/AdminRoute.jsx";

// USER PAGES
import UserDashboard from "./components/user/UserDashboard.jsx";
import UserProfile from "./components/user/UserProfile.jsx";

// ADMIN PAGES
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import UserList from "./components/admin/UserList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // PUBLIC ROUTES
      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ],
      },

      // USER ROUTES
      {
        path: "user",
        element: <PrivateRoute />,
        children: [
          { path: "dashboard", element: <UserDashboard /> },
          { path: "profile", element: <UserProfile /> },
        ],
      },

      // ADMIN ROUTES
      {
        path: "admin",
        element: <AdminRoute />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "users", element: <UserList /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
