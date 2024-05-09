import React, { useState, useEffect } from "react";
import { Category } from "../models/category";
import { categoriesService } from "../services/categoryService";
import {
  UserAuthProvider,
  BusinessAuthProvider,
  ShoppingCartProvider,
  ProductProvider,
  useProductContext,
  CategoryProvider,
  BiddingProvider,
} from "../context/";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CategoryList, ProductList, ProductDetail } from "../components";
import { DeleteProduct, UpdateProduct } from "../components/Sell/CRUD";
import Routes from "./Routes";
import "./App.scss";

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

  // Existing routes
  const existingRoutes = [
  
    {
      path: "/products",
      element: (
        <ProductProvider>
          <CategoryList categories={categories} total={total} />
          <ProductList products={searchResults || []} />
        </ProductProvider>
      ),
    },
    {
      path: "/category/:categoryName",
      element: (
        <ProductProvider>
          <CategoryList categories={categories} total={total} />
          <ProductList products={searchResults || []} />
        </ProductProvider>
      ),
    },
    {
      path: "/item/:productId",
      element: <ProductDetail total={total} />,
    },
 
    {
      path: "/edit/:productId",
      element: <UpdateProduct total={total} />,
    },
    {
      path: "/delete/:productId",
      element: <DeleteProduct total={total} />,
    },
  ];

  // Merge existing routes with routes from Routes.tsx
  const allRoutes = [...existingRoutes, ...Routes(total)];

  const router = createBrowserRouter(allRoutes);

  return (
    <React.StrictMode>
      <UserAuthProvider>
        <BusinessAuthProvider>
          <ShoppingCartProvider>
            <CategoryProvider>
              <ProductProvider>
                <BiddingProvider>
                  <RouterProvider router={router} />
                </BiddingProvider>
              </ProductProvider>
            </CategoryProvider>
          </ShoppingCartProvider>
        </BusinessAuthProvider>
      </UserAuthProvider>
    </React.StrictMode>
  );
};

export default App;
