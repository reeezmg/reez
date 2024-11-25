import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';

function DriverRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  // Fetch all requests for the current driver
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('https://reez-server.vercel.app/api/requests/driver', {
          withCredentials: true,
        });
        setRequests(response.data.requests);
      } catch (error) {
        setError('Failed to fetch requests');
        console.error(error);
      }
    };

    fetchRequests();
  }, []);

  // Function to handle WhatsApp message
  const handleSendMessage = (passengerId) => {
    const message = `Hello ${passengerId?.name}`;
    const whatsappUrl = `https://wa.me/${passengerId?.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Function to handle email message
  const handleSendEmail = (passengerId) => {
    const subject = `Hello ${passengerId?.name}`;
    const body = `Hi ${passengerId?.name},\n\nYour request has been received.`;
    const mailtoUrl = `mailto:${passengerId?.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Driver Requests</h1>

      {error && (
        <p className="text-red-500 bg-red-100 p-4 rounded-md mb-6 w-full max-w-4xl text-center">
          {error}
        </p>
      )}

      {requests.length === 0 ? (
        <p className="text-gray-700 text-lg">No requests found.</p>
      ) : (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Passenger Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {request.passengerId?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {request.passengerId?.email || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {request.passengerId?.phone || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                    <button
                      onClick={() => handleSendMessage(request.passengerId)}
                      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                    >
                      <FaWhatsapp />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleSendEmail(request.passengerId)}
                      className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                      <FaEnvelope />
                      Email
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DriverRequests;
