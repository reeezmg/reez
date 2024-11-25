import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../components/modal/Modal';

function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const [pickuppoint, setPickuppoint] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [shiftFilter, setShiftFilter] = useState('');
  const [rotaTypeFilter, setRotaTypeFilter] = useState('');
  const [radius, setRadius] = useState('');
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState({});
  const [selectedDays, setSelectedDays] = useState([]);
  const [nearLocation, setNearLocation] = useState(false);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCheckboxChange = (e, dayValue) => {
    if (e.target.checked) {
      setSelectedDays((prev) => [...prev, dayValue]);
    } else {
      setSelectedDays((prev) => prev.filter((day) => day !== dayValue));
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('https://www.server.reez.uk/api/drivers');
      setDrivers(response.data.drivers);
      console.log(response)
      setFilteredDrivers(response.data.drivers);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch drivers');
    }
  };

  // Filter drivers based on query parameters
  const handleFilterChange = async () => {
    try {
      const query = {
        pickuppoint,
        teamNumber: teamFilter,
        shiftTime: shiftFilter,
        rotaType: rotaTypeFilter,
        radius,
      };

      // Remove empty query parameters
      const queryParams = Object.entries(query)
        .filter(([_, value]) => value !== '')
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

      const response = await axios.get(
        `https://www.server.reez.uk/api/drivers${queryParams ? `?${queryParams}` : ''}`
      );
      setFilteredDrivers(response.data.drivers);
      setNearLocation(response.data.nearLocation)
      console.log(response)
    } catch (error) {
      console.error(error);
      alert('Failed to apply filters');
    }
  };

  const handleModalOpen = (driver) => {
    setShowModal(true);
    setSelectedDriver(driver);
  };

  const handleRequest = async () => {
    try {
      if (!selectedDays || selectedDays.length === 0) {
        alert('Please select at least one day to book.');
        return;
      }

      const response = await axios.post(
        'https://www.server.reez.uk/api/requests',
        {
          driverId: selectedDriver._id,
          days: selectedDays,
        },
        {
          withCredentials: true,
        }
      );

      alert(`Ride request sent successfully for Driver: ${selectedDriver._id}`);
    } catch (error) {
      console.error('Error sending ride request:', error);
      alert('Failed to send request. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Find a Driver</h1>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <input
          type="text"
          placeholder="Team Number"
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <select
          value={shiftFilter}
          onChange={(e) => setShiftFilter(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        >
          <option value="">Select Shift Time</option>
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
          <option value="night">Night</option>
          <option value="9 to 5">9 to 5</option>
        </select>
        <select
          value={rotaTypeFilter}
          onChange={(e) => setRotaTypeFilter(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        >
          <option value="">Select Rota Type</option>
          <option value={5}>5-2</option>
          <option value={4}>4-2</option>
        </select>
        <input
          type="text"
          placeholder="Pickup Point"
          value={pickuppoint}
          onChange={(e) => setPickuppoint(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <input
          type="number"
          placeholder="Radius (miles)"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <button
          onClick={handleFilterChange}
          className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

      {/* Drivers as Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.length === 0 ? (
          <p className="text-center py-4 col-span-full">No drivers available.</p>
        ) : (
          filteredDrivers.map((driver) => (
            <div
              key={driver._id}
              className="flex flex-col justify-between border border-gray-300 rounded-lg p-4 shadow-md"
            >
              <div className="flex-grow">
                <p className="font-bold text-lg mb-2">
                  {driver.userDetails?.name || 'N/A'}
                </p>
               
                <p>
                  <span className="font-semibold">{nearLocation ? 'Nearest Point' : 'Pickup Point'}</span>{' '}
                  {driver.pickupAddresses?.length > 0
                    ? driver.pickupAddresses.join(', ')
                    : 'N/A'}
                </p>
                <p>
                  <span className="font-semibold">Team Number:</span>{' '}
                  {driver.teamNumber}
                </p>
                <p>
                  <span className="font-semibold">Shift:</span> {driver.shiftTime}
                </p>
                <p>
                  <span className="font-semibold">Rota:</span> {driver.rotaType === 4 ? '4 - 2' : '5 - 2'}
                </p>
                
                <p>
                <span className="font-semibold">Charges: </span> 
                  {
                    driver.chargesOption === 'varies' 
                      ? `${driver.upperLimit} - ${driver.lowerLimit} ` 
                      : `${driver.charges} `
                  } 
                  ({driver.chargesOption})
                </p>
                <p>
                  <span className="font-semibold">Seats Available:</span>{' '}
                  {driver.seatsAvailable}
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleModalOpen(driver)}
                  className="bg-green-500 text-white rounded-lg px-4 py-2 w-full hover:bg-green-600"
                >
                  Request
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
       <Modal showModal={showModal} handleCloseModal={handleCloseModal}>
       <div className="p-4">
         <h2 className="text-2xl font-bold mb-4">Request a Ride</h2>
         <p className="mb-4">Select the days you want to book:</p>
         {selectedDriver.rotaType > 0 ? (
           Array.from({ length: selectedDriver.rotaType }, (_, index) => {
             const dayValue = `Day ${index + 1}`;
             const isSelected = selectedDays.includes(dayValue);
             return (
               <div
                 key={index}
                 onClick={() =>
                   handleCheckboxChange(
                     { target: { checked: !isSelected } },
                     dayValue
                   )
                 }
                 className={`cursor-pointer inline-block mb-2 px-4 py-2 rounded-lg text-center border ${
                   isSelected
                     ? 'bg-blue-500 text-white'
                     : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                 }`}
               >
                 {dayValue}
               </div>
             );
           })
         ) : (
           <p>No rota types available for this driver.</p>
         )}
         <div className="flex space-x-4 mt-4">
           <button
             onClick={handleRequest}
             className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
           >
             Request
           </button>
           <button
             onClick={handleCloseModal}
             className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
           >
             Close
           </button>
         </div>
       </div>
     </Modal>
     
      )}
    </div>
  );
}

export default DriverList;
