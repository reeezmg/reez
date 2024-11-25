import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate(); 
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Connect with Colleagues and Share Rides Easily!
        </h2>
        <p className="mt-4 text-gray-600">
          Reez helps you find colleagues willing to share their rides to the
          workspace. Save money, reduce carbon footprint, and build better
          connections with your peers.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white font-medium px-6 py-3 rounded hover:bg-blue-700"
          >
            Explore Drivers
          </Link>
          <Link
            to="/login"
            className="bg-gray-200 text-blue-600 font-medium px-6 py-3 rounded hover:bg-gray-300"
          >
            Add My Car
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Why Choose Reez?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded shadow">
              <h4 className="text-xl font-semibold text-blue-600 mb-2">
                Cost Effective
              </h4>
              <p className="text-gray-600">
                Share rides and save on fuel and parking costs.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded shadow">
              <h4 className="text-xl font-semibold text-blue-600 mb-2">
                Eco-Friendly
              </h4>
              <p className="text-gray-600">
                Reduce your carbon footprint by carpooling with colleagues.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded shadow">
              <h4 className="text-xl font-semibold text-blue-600 mb-2">
                Community Building
              </h4>
              <p className="text-gray-600">
                Connect and strengthen relationships with your peers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Reez. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
