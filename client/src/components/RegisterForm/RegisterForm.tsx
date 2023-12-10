import React, { useState } from 'react';
import { authService } from '../../services/authService';




const RegisterForm: React.FC = ()=>{

    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await authService.register(username,password);
            console.log('Registration was successfull');
        }catch(error){
            console.error(`Registration failed due to : ${error}`);
            alert(error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default RegisterForm;