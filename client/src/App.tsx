import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Register, SignIn } from './pages';
import { categoryData, productData } from './utils/searchBarConstants';
import { CategoryList,ProductList } from './components';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<SignIn/>} />
          <Route
          path="/"
          element={<CategoryList categories={categoryData} />}
        />
          {categoryData.map((category) => (
          <Route
          key={category.name}
          path={`/category/${encodeURIComponent(category.name)}`}
          element={<ProductList products={productData.filter((p) => p.parent === category.name)} />}
        />
        ))}
      </AuthProvider>
    </Router>
  );
};

export default App;
