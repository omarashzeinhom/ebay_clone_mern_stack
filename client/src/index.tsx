// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, SignIn, Register } from './pages';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary, NotFound } from './components';
import { CategoryList , ProductList, CustomerService } from './components/';
import { ProductProvider } from './context/ProductContext';
import { categoryData } from './utils/searchBarConstants';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: (
      <ProductProvider>
        <CategoryList categories={categoryData} />
      </ProductProvider>
    ),
    children: categoryData.map((category) => ({
      path: `/category/${encodeURIComponent(category.name)}`,
      element: (
        <ProductProvider key={category.name}>
          <ProductList selectedCategory={category?.name} />
        </ProductProvider>
      ),
    })),
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/help&contact',
    element: <CustomerService/>, 
  },
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);

reportWebVitals();
