import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete  } from 'react-icons/md';

function DriverInfo() {
  const [chargesOption, setChargesOption] = useState('');
  const [charges, setCharges] = useState('');
  const [lowerLimit, setLowerLimit] = useState('');
  const [upperLimit, setUpperLimit] = useState('');
  const [teamNumber, setTeamNumber] = useState('');
  const [shiftTime, setShiftTime] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState('');
  const [rotaType, setRotaType] = useState('');
  const [pickuppoints, setPickuppoints] = useState([]); // Holds pickup points with ID and address
  const userId = 'USER_ID'; // Replace with the actual user ID (e.g., from auth context)

  useEffect(() => {
    const fetchDriverInfo = async () => {
      try {
        const response = await axios.get(`https://server.reez.uk/api/drivers/getdriverinfo`, {
          withCredentials: true,
        });

        const { driver } = response.data;
        setChargesOption(driver.chargesOption || '');
        setCharges(driver.charges || '');
        setLowerLimit(driver.lowerLimit || '');
        setUpperLimit(driver.upperLimit || '');
        setTeamNumber(driver.teamNumber || '');
        setShiftTime(driver.shiftTime || '');
        setSeatsAvailable(driver.seatsAvailable || '');
        setRotaType(driver.rotaType || '');
        setPickuppoints(driver.pickuppoints || []); // Pickup points contain ID and address
      } catch (error) {
        console.error('Error fetching driver info:', error);
        alert('Failed to load driver information.');
      }
    };

    fetchDriverInfo();
  }, [userId]);

  const handlePickupPointChange = (index, value) => {
    const updatedPoints = [...pickuppoints];
    updatedPoints[index].address = value; // Update only the address
    setPickuppoints(updatedPoints);
  };

  const handleAddPickupPoint = () => {
    setPickuppoints([...pickuppoints, { _id: null, address: '' }]); // Add a new empty pickup point
  };

  const handleRemovePickupPoint = async (id, index) => {
    if (id) {
      // Only call the API if the pickup point has an ID
      try {
        await axios.delete(`https://server.reez.uk/api/drivers/pickuppoint/${id}`, {
          withCredentials: true,
        });
        alert('Pickup point removed successfully');
      } catch (error) {
        console.error('Error removing pickup point:', error);
        alert('Failed to remove pickup point.');
        return;
      }
    }

    // Remove the pickup point locally
    const updatedPoints = pickuppoints.filter((_, i) => i !== index);
    setPickuppoints(updatedPoints);
  };

  const handleSaveInfo = async () => {
    try {
      const driverInfo = {
        pickuppoints: pickuppoints.map((point) => point.address), // Send only the addresses
        chargesOption,
        charges,
        lowerLimit,
        upperLimit,
        teamNumber,
        shiftTime,
        seatsAvailable,
        rotaType,
      };

      await axios.put('https://server.reez.uk/api/drivers/update', driverInfo, {
        withCredentials: true,
      });

      alert('Driver information updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update driver information');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">Edit Driver Information</h1>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Pickup Points */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Pickup Points</label>
          {pickuppoints.map((point, index) => (
            <div key={index} className="flex items-center gap-4 mt-2">
              <input
                type="text"
                placeholder={`Pickup Point ${index + 1}`}
                value={point.address}
                onChange={(e) => handlePickupPointChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => handleRemovePickupPoint(point._id, index)}
                className="px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
              >
                <MdDelete size={16}/>
              </button>
            </div>
          ))}
          <button
            onClick={handleAddPickupPoint}
            className="mt-2 text-sm text-blue-500 hover:underline"
          >
            Add Pickup Point
          </button>
        </div>


          {/* Charges */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Charges
          </label>
          <select
            value={chargesOption}
            onChange={(e) => setChargesOption(e.target.value)}
            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="fixed">Fixed</option>
            <option value="negotiable">Negotiable</option>
            <option value="varies">Varies</option>
          </select>
          {chargesOption === 'varies' ? (
            <div className="flex gap-4 mt-2">
              <input
                type="number"
                placeholder="Lower Limit"
                value={lowerLimit}
                onChange={(e) => setLowerLimit(e.target.value)}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Upper Limit"
                value={upperLimit}
                onChange={(e) => setUpperLimit(e.target.value)}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ) : (
            <input
              type="number"
              placeholder="Charges"
              value={charges}
              onChange={(e) => setCharges(e.target.value)}
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          )}
        </div>

        {/* Team Number */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Team Number
          </label>
          <input
            type="text"
            placeholder="Team Number"
            value={teamNumber}
            onChange={(e) => setTeamNumber(e.target.value)}
            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Shift Time */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Shift Time
          </label>
          <select
            value={shiftTime}
            onChange={(e) => setShiftTime(e.target.value)}
            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
            <option value="9 to 5">9 to 5</option>
          </select>
        </div>

        {/* Seats Available */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Seats Available
          </label>
          <input
            type="number"
            placeholder="Seats Available"
            value={seatsAvailable}
            onChange={(e) => setSeatsAvailable(e.target.value)}
            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Rota Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Rota Type
          </label>
          <select
            value={rotaType}
            onChange={(e) => setRotaType(e.target.value)}
            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value={5}>5-2</option>
            <option value={4}>4-2</option>
          </select>
        </div>
        
        {/* Save Info Button */}
        <button
          onClick={handleSaveInfo}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Save Info
        </button>
      </div>
    </div>
  );
}

export default DriverInfo;
