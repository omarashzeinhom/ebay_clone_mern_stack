import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Register, SignIn } from './pages';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<SignIn/>} />
      </AuthProvider>
    </Router>
  );
};

export default App;
