import React, { useEffect, useState } from "react";
import axios from "axios"; // To make API requests

const Settings = () => {
  // State to store user data and form inputs
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state for API requests

  const userId = "12345"; // Replace with the actual user ID, you can get it from authentication

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(` http://localhost: 8000/api/users/getuserinfo`,{
          withCredentials: true, // Assuming authentication is required
        });
        setUser(response.data.user);
      } catch (error) {
        setError("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission (update user data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(` http://localhost: 8000/api/users/`, user,{
        withCredentials: true, // Assuming authentication is required
      });
      alert("User details updated successfully.");
    } catch (error) {
      setError("Error updating user data.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-semibold text-center mb-4">User Profile</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={user.location}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto mt-4 px-6 py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
