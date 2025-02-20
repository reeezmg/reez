import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import AuthService from '../service/AuthService';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate(); 
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    console.log('Logging out...');
    await AuthService.logout()
    window.location.reload()
  };

  return (
    <div className="relative">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full bg-blue-500 text-white shadow-md z-50">
        <div className="flex items-center justify-end px-4 py-3">
          {/* Left Section with Menu Button and Company Name */}
          {/* <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
            >
              <FiMenu size={24} />
            </button>
            <div className="text-xl font-bold">Reez</div>
          </div> */}

          {/* Right Section with Top Bar Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="py-1 px-4 bg-red-500 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-blue-500 shadow-lg transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 text-center text-xl font-bold border-b border-blue-300">
          Reez
        </div>
        <nav className="flex-grow">
          <ul className="mt-4 space-y-2 px-4">
            <li>
              <Link
                to="/passenger"
                className="block py-2 px-4 rounded hover:bg-blue-100"
              >
                Drivers
              </Link>
            </li>
            <li>
              <Link
                to="/passenger/requests"
                className="block py-2 px-4 rounded hover:bg-blue-100"
              >
                Requests
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block py-2 px-4 rounded hover:bg-blue-100"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
