// client/src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Mock Login
      </button>
    </div>
  );
};

export default Login;
