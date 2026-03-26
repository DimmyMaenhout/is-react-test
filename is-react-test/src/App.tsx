import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import PostCommentsPage from "./Pages/PostCommentsPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/posts/:id", element: <PostCommentsPage /> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
