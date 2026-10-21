import { createRoot } from "react-dom/client";
import BookSystem from "./pages/book-system";
import Login from "./pages/login";
import Register from "./pages/register";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BookSystem />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const root = createRoot(document.getElementById("root")!);

root.render(<RouterProvider router={router} />);
