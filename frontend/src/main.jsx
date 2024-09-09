/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/Store.jsx";
import MainPage from "./pages/MainPage.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Admin from "./pages/Admin.jsx";
import VendorPage from "./pages/VendorPage.jsx";
import About from "./components/About.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/about", element: <About/> },
    ],
  },
  { path: "/admin", element: <Admin /> },
  { path: "/vendor", element: <VendorPage /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
