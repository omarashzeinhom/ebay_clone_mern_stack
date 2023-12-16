// App.tsx
import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, SignIn, Register } from "../pages";
import { AuthProvider } from "../context/AuthContext";
import { ErrorBoundary, NotFound } from "../components";
import {
  CategoryList,
  ProductList,
  CustomerService,
  ProductDetail,
  Profile,
} from "../components";
import { ProductProvider } from "../context/ProductContext";
import { Category } from "../models/category";
import { categoriesService } from "../services/categoryService";

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch categories from the server when the component mounts
    const fetchCategories = async () => {
      try {
        const data = await categoriesService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
      path: "/help&contact",
      element: <CustomerService />,
    },

    {
      path: "/",
      element: (
        <ProductProvider>
          <CategoryList categories={categories} />
          <ProductList />
        </ProductProvider>
      ),
      children: categories.map((category) => ({
        path: `/category/${encodeURIComponent(category?.name)}`,
        element: (
          <ProductProvider key={category?.name || " "}>
            <ProductList />
          </ProductProvider>
        ),
      })),
    },

    {
      path: "/products",
      element: (
        <ProductProvider>
          <CategoryList categories={categories} />
          <ProductList />
        </ProductProvider>
      ),
    },
    {
      path: "/category/:categoryName", // Add this route for category
      element: (
        <ProductProvider>
          <CategoryList categories={categories} />
          <ProductList />
        </ProductProvider>
      ),
    },
    {
      path: "/item/:productId",
      element: <ProductDetail />,
    },
    {
      path: "/",
      element: <ProductDetail />,
    },
    {
      path: "/",
      element: <Profile />,
    },
    {
      path: "/user/:userId",
      element: <Profile />,
    },
    {
      path: "/business/:businessId",
      element: <Profile />,
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ProductProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ProductProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;
