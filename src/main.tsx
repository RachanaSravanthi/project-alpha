import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import AboutPage from "./pages/AboutUs.tsx";
import HomePage from "./pages/HomePage.tsx";


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
            },
        ],
    },
]);
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={appRouter} />
    </StrictMode>
);
