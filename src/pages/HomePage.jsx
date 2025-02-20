import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import DynamicCard from "./Cardedit/CardTemplate/DynamicCard";
import { QRCodeCanvas } from "qrcode.react";
import Modal from "../components/modal/Modal";
import axios from "axios";

const steps = ["Step 1: Card Selection", "Step 2: Page Selection", "Step 3: Payment", "Completed"];

const HomePage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [uname, setUname] = useState("");
  const [unameStatus, setUnameStatus] = useState({ type: false, message: "" }); // Stores success or error message
  const [cardInfo, setCardInfo] = useState([])

  const [cards, setCards] = useState([
    { id: 1, name: "Card 1", subtitle: "Personal Card", step: 1, logo: "https://via.placeholder.com/50", qrCode: "https://via.placeholder.com/50" },
    { id: 2, name: "Card 2", subtitle: "Business Card", step: 2, logo: "https://via.placeholder.com/50", qrCode: "https://via.placeholder.com/50" },
    { id: 3, name: "Card 3", subtitle: "Event Card", step: 3, logo: "https://via.placeholder.com/50", qrCode: "https://via.placeholder.com/50" },
    { id: 4, name: "Card 4", subtitle: "Event Card", step: 4, logo: "https://via.placeholder.com/50", qrCode: "https://via.placeholder.com/50" },
  ]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCardClick = (cardId) => {
    navigate(`step1/${cardId}`);
  };

  const handleAddCard = () => {
    handleOpenModal();
  };

  const handleNext = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/set/", {
        uname,
        step:1
      }, {withCredentials: true});
  
      if (response.status === 201) { // Assuming 201 Created response
        setUnameStatus({ type: "success", message: "Step created successfully!" });
        navigate(`step1/${response.data}`);
      }
    } catch (error) {
      console.error("Error creating step:", error);
      setUnameStatus({ 
        type: "error", 
        message: error.response?.data?.message || "Failed to create step. Try again." 
      });
    }
  };

  // Function to check if uname is available
  const checkUnameAvailability = async () => {
    if (!uname.trim()) {
      setUnameStatus({ type: "error", message: "Please enter a username" });
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/set/check-uname/${uname}`);
      const data = await response.json();
      console.log(data)
      if (data.available) {
        setUnameStatus({ type: data.available, message: data.message });
      } else {
        setUnameStatus({ type: data.available, message: data.message });
      }
    } catch (error) {
      console.error("Error checking uname:", error);
      setUnameStatus({ type: "error", message: "Server error. Please try again later." });
    }
  };

  const fetchCards = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/set/card", {
        withCredentials: true, // Ensures authentication credentials are included
      });
      if (response.data.length > 0) {
        // Map over all cards and set their data to cardInfo
        const updatedCardInfo = response.data.map((card) => ({
          id:card._id,
          templateName: card.card?.templateName || "HPlain",
          textColor: card.card?.textColor || "#000000",
          bgColor: card.card?.bgColor || "#ffffff",
          companyName: card.card?.companyName || "company Name",
          name: card.card?.name || "name",
          subtitle: card.card?.subtitle || "subtitle",
          step:card.step,
          uname:card.uname,
          logo:card.card?.logo || null,
          front:card.card?.front || null,
          back:card.card?.back || null
        }));
        setCardInfo(updatedCardInfo); // Set the array of card info
      } 
  
      console.log("User Sets:", response.data);
    } catch (error) {
      console.error("Error fetching user sets:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchCards()
  }, [])
  useEffect(() => {
    setUnameStatus({
      type:false,
      message:''
    })
  }, [uname])

  useEffect(() => {
   console.log(cardInfo)
  }, [cardInfo])
  

  return (
    <div className="p-4 bg-gray-200 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          onClick={handleAddCard}
          className="border-2 border-dashed border-gray-400 p-8 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-gray-100 transition h-48"
        >
          <Plus size={32} className="text-gray-500" />
          <p className="text-gray-500 mt-2">Add New Card</p>
        </div>
        {cardInfo.map((card) => {
          const blurAmount = 10.5 - card.step * 3;
          const isStep4 = card.step === 4;

          return (
            <div key={card.id} className="relative">
              <div
                onClick={() => handleCardClick(card.id)}
                className="border border-gray-300 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow flex flex-col items-center justify-center bg-white text-black h-48 relative overflow-hidden"
              >
                {!isStep4 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <svg className="w-16 h-16" viewBox="0 0 36 36">
                      <circle className="text-gray-300" strokeWidth="4" stroke="currentColor" fill="transparent" r="16" cx="18" cy="18" />
                      <circle
                        className="text-blue-500"
                        strokeWidth="4"
                        strokeDasharray="100"
                        strokeDashoffset={`${100 - (card.step / 4) * 100}`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="16"
                        cx="18"
                        cy="18"
                      />
                    </svg>
                    <span className="absolute text-sm font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{card.step}/3</span>
                  </div>
                )}
                 <p className=" text-base font-medium mt-28 text-center text-blue-600 relative z-10">{steps[card.step - 1]}</p>
                <div className="absolute inset-0 bg-gray-200" style={{ filter: `blur(${blurAmount}px)` }}>
                  <DynamicCard templateName={card.templateName} textColor={card.textColor} bgColor={card.bgColor} logo={card.logo} front={card.front} back={card.back} companyName={card.companyName} name={card.name} subtitle={card.subtitle} QRCodeCanvas={QRCodeCanvas} home={true}/>
                </div>
              </div>
              <p className="text-sm font-medium mt-2 mb-4 text-center text-blue-600 relative z-10">{card.uname}</p>
            </div>
          );
        })}
      </div>
      <Modal showModal={showModal} handleCloseModal={handleCloseModal}>
        <div className="p-6">
        <input
          type="text"
          placeholder="Enter unique name"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {/* Display success or error message */}
        {unameStatus && (
          <p className={`mt-2 text-sm ${unameStatus.type  ? "text-green-600" : "text-red-600"}`}>
            {unameStatus.message}
          </p>
        )}
        {
          unameStatus.type ? 
          (
            <div className="flex justify-end mt-6">
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Next
            </button>
          </div>
          ) :(
            <div className="flex justify-end mt-6 ">
            <button
              onClick={checkUnameAvailability}
              className="bg-green-500 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Check
            </button>
          </div>
          )
        }
       
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
