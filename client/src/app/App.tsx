import "./App.scss";
import React, { useState, useEffect } from "react";
import { Category } from "../models/category";
import { AuthProvider } from "../context/AuthContext";
import { ProductProvider } from "../context/ProductContext";
import { categoriesService } from "../services/categoryService";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, SignIn, Register, CustomerService, NotFound } from "../pages";
import {CategoryList,ProductList,ProductDetail,Profile,ErrorBoundary } from "../components";
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
    /* <--- Main Routes Start --->  */
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
      path: "*",
      element: <NotFound />,
    },
    /* <--- Main Routes End --->  */
    /* <--- Product & Categories Start ---> */
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
      path: "/category/:categoryName",
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
    /* <--- Product & Categories End ---> */
    /* <--- Auth & Profile Start  ---> */
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
    /* <--- Auth & Profile End  ---> */
  ];

  const router = createBrowserRouter(routes);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ShoppingCartProvider>
          <ProductProvider>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </ProductProvider>
        </ShoppingCartProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;
