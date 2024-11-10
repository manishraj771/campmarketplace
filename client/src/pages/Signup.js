// client/src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      setSuccess(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input type="text" name="name" onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1">University Email</label>
            <input type="email" name="email" onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input type="password" name="password" onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
