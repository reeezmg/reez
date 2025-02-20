import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CardDetails = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState({
    id: cardId,
    name: "",
    subtitle: "",
    phone: "",
    email: "",
    website: "",
    address: "",
  });

  useEffect(() => {
    // Fetch card details from an API or local storage (mock data for now)
    const mockCardData = {
      id: cardId,
      name: `Card ${cardId}`,
      subtitle: `Subtitle for Card ${cardId}`,
      phone: "",
      email: "",
      website: "",
      address: "",
    };
    setCard(mockCardData);
  }, [cardId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save card details (e.g., to an API or local storage)
    console.log("Card details saved:", card);
    alert("Card details saved successfully!");
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Card Details</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={card.name}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={card.subtitle}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={card.phone}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={card.email}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="text"
            name="website"
            value={card.website}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={card.address}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardDetails;