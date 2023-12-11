import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, SignIn, Register } from "./pages";
import { AuthProvider } from "./context/AuthContext";
import { CategoryList, ProductList } from "./components";
import { categoryData, productData } from "./utils/searchBarConstants";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <CategoryList categories={categoryData} />,
    children: categoryData.map((category) => ({
      path: `/category/${encodeURIComponent(category.name)}`,
      element: (
        <ProductList
          products={productData.filter((p) => p.parent === category.name)}
        />
      ),
    })),
  },
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
