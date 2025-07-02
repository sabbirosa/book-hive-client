import AddBook from "@/pages/AddBook";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "add-book",
        Component: AddBook,
      },
    ],
  },
]);

export default router;
