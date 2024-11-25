import React, { useState, useEffect } from "react";
import axios from "axios";

function RequestsList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("https://reez-server.vercel.app/api/requests/passenger", {
          withCredentials: true, // Assuming authentication is required
        });
        setRequests(response.data.requests);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleRequestClick = (driver) => {
    alert(`Request sent to driver: ${driver.userDetails?.name || "N/A"}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Your Requests
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.length === 0 ? (
            <p className="text-center py-4 col-span-full">
              No requests available.
            </p>
          ) : (
            requests.map((request) => (
              <div
                key={request._id}
                className="flex flex-col justify-between border border-gray-300 rounded-lg p-4 shadow-md bg-white"
              >
                <div className="flex-grow">
                  <p className="font-bold text-lg mb-2">
                    {request.driverId?.user?.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Pickup Points:</span>{" "}
                    {request.driverId?.pickuppoints?.length > 0
                      ? request.driverId.pickuppoints.map((point) => point.address).join(", ")
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Team Number:</span>{" "}
                    {request.driverId?.teamNumber || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Shift:</span>{" "}
                    {request.driverId?.shiftTime || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Rota:</span>{" "}
                    {request.driverId?.rotaType === 4
                      ? "4 - 2"
                      : request.driverId?.rotaType === 5
                      ? "5 - 2"
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Charges:</span>{" "}
                    {request.driverId?.chargesOption === "varies"
                      ? `$${request.driverId?.lowerLimit} - $${request.driverId?.upperLimit}`
                      : `$${request.driverId?.charges}`}{" "}
                    ({request.driverId?.chargesOption || "N/A"})
                  </p>
                  <p>
                    <span className="font-semibold">Seats Available:</span>{" "}
                    {request.driverId?.seatsAvailable || "N/A"}
                  </p>
                </div>
              
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default RequestsList;
