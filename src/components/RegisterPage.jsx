import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [registerDetails, setRegisterDetails] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = () => {
    const { username, password } = registerDetails;

    // Check if a user is already registered
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username already exists
    const isUserExist = existingUsers.some((user) => user.username === username);
    if (isUserExist) {
      toast.error('Username already exists. Please choose a different username.');
      return;
    }

    // Add the new user to the existing users array
    existingUsers.push({ username, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Registration successful! Please log in.');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register Your Account</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          className="space-y-6"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={registerDetails.username}
              onChange={(e) => setRegisterDetails({ ...registerDetails, username: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={registerDetails.password}
              onChange={(e) => setRegisterDetails({ ...registerDetails, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none"
          >
            Register
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-indigo-600 hover:underline">
              Login here
            </Link>
            .
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
