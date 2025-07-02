import { createBrowserRouter } from "react-router";
import App from "../App";
import BookDetails from "../pages/BookDetails";
import Books from "../pages/Books";
import BorrowBook from "../pages/BorrowBook";
import BorrowSummary from "../pages/BorrowSummary";
import CreateBook from "../pages/CreateBook";
import EditBook from "../pages/EditBook";
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
        path: "books",
        element: <Books />,
      },
      {
        path: "create-book",
        element: <CreateBook />,
      },
      {
        path: "books/:id",
        element: <BookDetails />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "borrow/:bookId",
        element: <BorrowBook />,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);

export default router;
