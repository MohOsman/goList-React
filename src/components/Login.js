import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/UserService';
import '../css/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = {
        username: username.trim(),
        password: password.trim(),
      };

      // Send the new user data to the backend server
      const response = await login(user);
      console.log('Login successful:', response.data);
      navigate('/task'); // Redirect to /task upon successful login
    } catch (error) {
      console.error('Error login user:', error);
    }
  };

  const handleSignUp = (e) => {
    navigate('/register');
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="loginUsername">Username</label>
          <input
            type="text"
            id="loginUsername"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            id="loginPassword"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <div className="forgot-password">
        <a href="#">Forgot Password</a>
      </div>
      <div className="register-link">
        Don't have an account?{' '}
        <button className="register-btn" onClick={handleSignUp}>
          Register
        </button>
      </div>
    </div>
    );
}

export default Login;
