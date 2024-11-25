import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import AuthService from '../service/AuthService';
import { useNavigate } from 'react-router-dom';

const SidebarDriver = () => {
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
      <div className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left Section with Menu Button and Company Name */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none"
            >
              <FiMenu size={24} />
            </button>
            <div className="text-xl font-bold">Reez</div>
          </div>

          {/* Right Section with Top Bar Actions */}
          <div className="flex items-center space-x-4">
            {/* <Link
              to="/notifications"
              className="text-white hover:text-gray-300"
            >
              Notifications
            </Link> */}
          
            <button
              onClick={handleLogout}
              className="py-1 px-4 bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 text-center text-xl font-bold border-b border-gray-700">
          Reez
        </div>
        <nav className="flex-grow">
          <ul className="mt-4 space-y-2 px-4">
            <li>
              <Link
                to="/driver"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Info
              </Link>
            </li>
            <li>
              <Link
                to="/driver/requests"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Requests
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block py-2 px-4 rounded hover:bg-gray-700"
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

export default SidebarDriver;
