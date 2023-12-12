// App.tsx
import React from 'react';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, SignIn, Register } from './pages';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary, NotFound } from './components';
import { CategoryList, ProductList, CustomerService } from './components/';
import { ProductProvider } from './context/ProductContext';
import { categoryData } from './utils/searchBarConstants';

const routes = [
  {
    path: "/",
    element : <Home/>,
  },
  {
    
    path: '/',
    element: (
      <ProductProvider>
        <CategoryList categories={categoryData} />
        {/* Pass an empty string as the default category */}
        <ProductList selectedCategory=''/>
      </ProductProvider>
    ),
    children: categoryData.map((category) => ({
      path: `/category/${encodeURIComponent(category.name)}`,
      element: (
        <ProductProvider key={category.name}>
          <ProductList selectedCategory={category.name} />
        </ProductProvider>
      ),
    })),
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
    path: '/help&contact',
    element: <CustomerService />,
  },
  {
    path: '/products',
    element: <ProductList />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

const App: React.FC = () => {
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
