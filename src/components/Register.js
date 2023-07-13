import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/UserService';
import '../css/Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = {
        username: username.trim(),
        password: password.trim(),
      };

      // Send the new user data to the backend server
      const response = await register(user);
      console.log('Registration successful:', response.data);
      navigate('/login'); // Redirect to login page upon successful registration
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="app">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="registerUsername">Username</label>
          <input
            type="text"
            id="registerUsername"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="registerPassword">Password</label>
          <input
            type="password"
            id="registerPassword"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
    </div>
    );
}

export default Register;
