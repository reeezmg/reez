import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import DynamicCard from "./CardTemplate/DynamicCard";
import DesignSelection from "./DesignSelection";
import CustomCard from "./CardTemplate/CustomCard";
import Modal from "../../components/modal/Modal"
import axios from "axios";

const EditCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [front, setFront] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [back, setBack] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [cardType, setCardType] = useState("plain");
  const [isFlipped, setIsFlipped] = useState(false);
  const [designShowModal, setDesignShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState("HPlain");
  
  const handleDesignCloseModal = () => {
    setDesignShowModal(false);
  };
  const handleDesignOpenModal = () => {
    setDesignShowModal(true);
  };
  
  const handleCardTypeChange = (type) => {
    setCardType(type);
    if(type === 'design'){
      handleDesignOpenModal()
    }
    else if(type === 'custom'){
      setSelectedCard('CustomCard')
    }
    else{
      setSelectedCard("HPlain")
    }
  };

 
  const handleNext = () => {
    navigate("/step2", { state: { name, subtitle, logo, textColor, bgColor, cardType } });
  };

  const cardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  const handleFileChange = (event, setImage, setPreview) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Store actual file for upload
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result); // Store preview
      reader.readAsDataURL(file);
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Function to handle image uploads
        const uploadImage = async (file, name) => {
            if (!file) return null; // If no file, return null

            const formData = new FormData();
            formData.append("image", file);
            formData.append("name", name); // Use a unique name for each image

            const response = await axios.post("http://localhost:8000/api/images/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            return response.data.url; // Assuming the server responds with the uploaded image URL
        };

        const logoName = logo ?  `${Date.now()}` : null;
        const frontName = front ?  `${Date.now()}` : null;
        const backName = back ?  `${Date.now()}` : null;

        // Upload images if they exist
        const logoUrl = logo ? await uploadImage(logo, logoName) : null;
        const frontUrl = front ? await uploadImage(front, frontName) : null;
        const backUrl = back ? await uploadImage(back, backName) : null;

        // Prepare final form data
        const formData = {
            templateName: selectedCard,
            front: frontName,
            back: backName,
            textColor: textColor,
            bgColor: bgColor,
            logo: logoName,
            companyName: companyName,
            name: name,
            subtitle: subtitle,
        };

        // Send form data to save the card
        const response = await axios.post(`http://localhost:8000/api/card`, { formData, id }, { withCredentials: true });
        console.log("Card saved:", response.data);

        // Navigate to the next step
        navigate(`/client/step2/${id}`);

    } catch (error) {
        console.error("Error uploading images or saving card:", error);
    }
};




  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Your Card</h1>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="mt-2 bg-gray-200 h-1 rounded">
          <div className="bg-blue-500 h-1 rounded" style={{ width: "20%" }}></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Select Card Type</h3>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => handleCardTypeChange("plain")}
              className={`flex-1 p-2 rounded-lg transition-colors ${
                cardType === "plain" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Plain
            </button>
            <button
              onClick={() => handleCardTypeChange("design")}
              className={`flex-1 p-2 rounded-lg transition-colors ${
                cardType === "design" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Design
            </button>
            <button
              onClick={() => handleCardTypeChange("custom")}
              className={`flex-1 p-2 rounded-lg transition-colors ${
                cardType === "custom" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Custom
            </button>
          </div>

          {cardType === "plain" && (
  <div className="w-full">
    {/* Background Color Input */}
    <div className="flex items-center mb-3 gap-4 w-full">
      <label className="text-sm font-medium text-gray-700 flex-shrink-0">Background Color:</label>
      <input
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
        className="w-full h-10 p-1 border rounded-lg"
      />
    </div>

    {/* Radio Buttons on a New Line */}
   
  </div>
)}

{/* <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
  <input
    type="text"
    placeholder="House No."
    className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
    value={address.houseNo}
    onChange={(e) => setAddress({ ...address, houseNo: e.target.value })}
  />
  <input
    type="text"
    placeholder="Street Name"
    className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
    value={address.street}
    onChange={(e) => setAddress({ ...address, street: e.target.value })}
  />
  <input
    type="text"
    placeholder="Landmark"
    className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
    value={address.landmark}
    onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
  />
  <input
    type="text"
    placeholder="City"
    className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
    value={address.city}
    onChange={(e) => setAddress({ ...address, city: e.target.value })}
  />
  <input
    type="text"
    placeholder="State"
    className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
    value={address.state}
    onChange={(e) => setAddress({ ...address, state: e.target.value })}
  />
  <input
    type="text"
    placeholder="Pincode"
    className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
    value={address.pincode}
    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
  />
  <input
    type="text"
    placeholder="Mobile Number"
    className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
    value={address.mobile}
    onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
  />
</div> */}


          <div className="space-y-4">
          <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
           <div className="flex items-center gap-4 w-full">
            <label className="text-sm font-medium text-gray-700 flex-shrink-0">Text Color:</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full h-10 p-1 border rounded-lg"
            />
          </div>


          <div className="flex items-center gap-4">
  <label className="text-sm font-medium text-gray-700">Logo:</label>
  <input
    type="file"
    onChange={(e) => handleFileChange(e, setLogo, setLogoPreview)}
    className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

            {cardType === "custom" && (
  <div>
    {/* Front Image Upload */}
    <div className="flex items-center gap-4 mb-3">
      <label className="text-sm font-medium text-gray-700">Front:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e, setFront, setFrontPreview)}
        className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Back Image Upload */}
    <div className="flex items-center gap-4">
      <label className="text-sm font-medium text-gray-700">Back:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e, setBack, setBackPreview)}
        className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
)}

          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg shadow-md transition-colors ${
                !isFlipped ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setIsFlipped(false)}
            >
              Front
            </button>
            <button
              className={`px-4 py-2 rounded-lg shadow-md transition-colors ${
                isFlipped ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setIsFlipped(true)}
            >
              Back
            </button>
          </div>

          <div className="flex justify-center items-center">
            <motion.div
              initial={false}
              animate={isFlipped ? "back" : "front"}
              variants={cardVariants}
              transition={{ duration: 0.6 }}
            >
              {/* FRONT SIDE */}
                            
              <DynamicCard templateName={selectedCard} front={frontPreview} back={backPreview} isFlipped={isFlipped} textColor={textColor} bgColor={bgColor} logo={logoPreview} companyName={companyName} name={name} subtitle={subtitle} QRCodeCanvas={QRCodeCanvas}/>
        
              {/* BACK SIDE */}
              
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>

      <Modal showModal={designShowModal} handleCloseModal={handleDesignCloseModal}>
          <DesignSelection selectedCard={selectedCard} setSelectedCard={setSelectedCard} textColor={textColor} bgColor={bgColor} logo={logoPreview} companyName={companyName} name={name} subtitle={subtitle} QRCodeCanvas={QRCodeCanvas}/>
      </Modal>


     

    </div>
  );
};

export default EditCard;