import React from "react";
import {
  UserAuthProvider,
  BusinessAuthProvider,
  ShoppingCartProvider,
  ProductProvider,
  useProductContext,
  BiddingProvider,
} from "../context/";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CategoryList, ProductList, ProductDetail } from "../components";
import { DeleteProduct, UpdateProduct } from "../components/Sell/CRUD";
import Routes from "./Routes";
import "./App.scss";
import { Provider } from 'react-redux';
import {store} from "../store/store";

type AppProps = {
  total: number;
};

const App: React.FC<AppProps> = ({ total }) => {
  const { searchResults } = useProductContext();

 

  // Existing routes
  const existingRoutes = [
    {
      path: "/products",
      element: (
        <ProductProvider>
          <CategoryList  total={total} />
          <ProductList products={searchResults || []} />
        </ProductProvider>
      ),
    },
    {
      path: "/category/:categoryName",
      element: (
        <ProductProvider>
          <CategoryList total={total} />
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
      element: <UpdateProduct total={total} pageTitle="Update Product"/>,
    },
    {
      path: "/delete/:productId",
      element: <DeleteProduct total={total} pageTitle="Update Product" />,
    },
  ];

  // Merge existing routes with routes from Routes.tsx
  const allRoutes = [...existingRoutes, ...Routes(total)];

  const router = createBrowserRouter(allRoutes);

  return (
    <React.StrictMode>
       <Provider store={store}>
      <UserAuthProvider>
        <BusinessAuthProvider>
          <ShoppingCartProvider>
          
              <ProductProvider>
                <BiddingProvider>
                  <RouterProvider router={router} />
                </BiddingProvider>
              </ProductProvider>
       
          </ShoppingCartProvider>
        </BusinessAuthProvider>
      </UserAuthProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
