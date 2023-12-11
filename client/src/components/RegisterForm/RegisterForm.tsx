import React, { useState } from 'react';
import { authService } from '../../services/authService';




const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleRegister = async () => {
      try {
        console.log(email, password); // Log the current values when the button is clicked
        await authService.register(email, password);
        console.log('Registration was successful');
      } catch (error) {
        console.error(`Registration failed due to: ${error}`);
        alert(error);
      }
    };
  
    return (
      <div>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    );
  };
  
  export default RegisterForm;
  