import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    navigate('/'); // Redirect to login page
  };

  return (
    <header className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl text-white font-bold">
          EventManager
        </Link>

        <nav>
          <ul className="flex space-x-6">
            {token ? (
              <>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white border border-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="text-white hover:text-gray-300 transition duration-300"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-white hover:text-gray-300 transition duration-300"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
