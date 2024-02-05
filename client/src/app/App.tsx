import "./App.scss";
import React, { useState, useEffect } from "react";
import { Category } from "../models/category";
import { AuthProvider } from "../context/AuthContext";
import { ProductProvider, useProductContext } from "../context/ProductContext";
import { categoriesService } from "../services/categoryService";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  SignIn,
  Register,
  CustomerService,
  Survey,
  NotFound,
  SellPage,
} from "../pages";
import {
  CategoryList,
  ProductList,
  ProductDetail,
  Profile,
  /**ErrorBoundary, */
  SearchResults,
} from "../components";
import { CategoryProvider } from "../context/CategoryContext";

type AppProps = {
  total: number;
};
const App: React.FC<AppProps> = ({ total }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { searchResults } = useProductContext();

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
      element: <Home total={total} />,
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
      element: <CustomerService total={total} />,
    },
    {
      path: "/survey",
      element: <Survey />,
    },
    {
      path: "/search-results", // Define the route for search results
      element: <SearchResults />,
    },
    {
      path: "/sell",
      element: <SellPage total={total} />,
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
          <CategoryList categories={categories} total={total} />
          <ProductList products={searchResults} />
        </ProductProvider>
      ),
      children: categories.map((category) => ({
        path: `/category/${encodeURIComponent(category?.name)}`,
        element: (
          <ProductProvider key={category?.name || " "}>
            <ProductList products={searchResults} />
          </ProductProvider>
        ),
      })),
    },

    {
      path: "/products",
      element: (
        <ProductProvider>
          <CategoryList categories={categories} total={total} />
          <ProductList products={searchResults} />
        </ProductProvider>
      ),
    },
    {
      path: "/category/:categoryName",
      element: (
        <ProductProvider>
          <CategoryList categories={categories} total={total} />
          <ProductList products={searchResults} />
        </ProductProvider>
      ),
    },
    {
      path: "/item/:productId",
      element: <ProductDetail total={total} />,
    },
    {
      path: "/",
      element: <ProductDetail total={total} />,
    },
    /* <--- Product & Categories End ---> */
    /* <--- Auth & Profile Start  ---> */
    {
      path: "/",
      element: <Profile total={total} />,
    },
    {
      path: "/user/:userId",
      element: <Profile total={total} />,
    },
    {
      path: "/business/:businessId",
      element: <Profile total={total} />,
    },
    /* <--- Auth & Profile End  ---> */
  ];

  const router = createBrowserRouter(routes);

  return (
    <React.StrictMode>
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>
            <ShoppingCartProvider>
              <RouterProvider router={router} />
            </ShoppingCartProvider>
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </React.StrictMode>
  );
};

export default App;
