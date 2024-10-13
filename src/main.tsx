import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header } from "./components/Header.tsx";
import "./index.css";
import { Authors } from "./pages/Authors.tsx";
import BookForm from "./pages/BookForm.tsx";
import { Books } from "./pages/Books.tsx";
import { EditAuthor } from "./pages/EditAuthor.tsx";
import { EditBook } from "./pages/EditBook.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BookForm />,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/books/:bookId",
    element: <EditBook />,
  },
  {
    path: "/authors",
    element: <Authors />,
  },
  {
    path: "/authors/:authorId",
    element: <EditAuthor />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="max-w-screen-lg mx-auto h-screen flex flex-col">
      <Header />
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
