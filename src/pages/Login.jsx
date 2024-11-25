import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../service/AuthService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const handleLogin = async () => {
    try {
      const response = await AuthService.login({ email, password });
      alert(`Login successful! Welcome to Reez`);
      // window.location.reload()

    } catch (error) {
      alert(error.message || 'Error logging in');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600" onClick={() => navigate('/')}>Reez</h1>
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-blue-600 font-medium px-4 py-2 hover:bg-gray-200 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-200"
            >
              Login
            </button>
            <div className="text-center mt-4">
              <Link
                to="/forgotpassword"
                className="text-sm text-blue-500 hover:underline focus:outline-none"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="text-center mt-2">
              <span className="text-sm text-gray-700">New User? </span>
              <Link
                to="/register"
                className="text-sm text-blue-500 hover:underline focus:outline-none"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
