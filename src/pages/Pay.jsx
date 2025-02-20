import axios from "axios";
import { useEffect, useState } from "react";
import DynamicCard from "./Cardedit/CardTemplate/DynamicCard";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export default function Pay() {
  const { id } = useParams();
  const [address, setAddress] = useState({
    houseNo: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
  });
  const [promoCode, setPromoCode] = useState("");
  const price = 500;
  const deliveryFee = 50;
  const discountedPrice = promoCode === "DISCOUNT10" ? price * 0.9 : price;
  const [cardInfo, setCardInfo] = useState([]);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/set/singlecard/${id}`, {
        withCredentials: true,
      });
      if (response.data) {
        const updatedCardInfo = {
          id: response.data._id,
          templateName: response.data.card?.templateName || "HPlain",
          textColor: response.data.card?.textColor || "#000000",
          bgColor: response.data.card?.bgColor || "#ffffff",
          companyName: response.data.card?.companyName || "Company Name",
          name: response.data.card?.name || "Name",
          subtitle: response.data.card?.subtitle || "Subtitle",
          step: response.data.step,
          uname: response.data.uname,
          logo: response.data.card?.logo || null,
          front: response.data.card?.front || null,
          back: response.data.card?.back || null,
        };
        setCardInfo(updatedCardInfo);
      }
    } catch (error) {
      console.error("Error fetching user sets:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-8 bg-gray-100 gap-8">
      {/* Left side - Dynamic Card */}
      <div className="flex justify-center items-center w-full lg:w-1/2">
        <div className="h-48 w-80 shadow-lg rounded-lg">
          <DynamicCard
            templateName={cardInfo.templateName}
            textColor={cardInfo.textColor}
            bgColor={cardInfo.bgColor}
            logo={cardInfo.logo}
            front={cardInfo.front}
            back={cardInfo.back}
            companyName={cardInfo.companyName}
            name={cardInfo.name}
            subtitle={cardInfo.subtitle}
            QRCodeCanvas={QRCodeCanvas}
          />
        </div>
      </div>

      {/* Right side - Payment Section */}
      <div className="w-full lg:w-1/2 bg-white p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Payment Details</h2>

        {/* Address Input Fields */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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
</div>

        {/* Promo Code Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
          <div className="flex">
            <input
              type="text"
              className="w-full border p-3 rounded-l-md focus:ring-2 focus:ring-blue-500"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
              onClick={() => alert("Promo code applied")}
            >
              Apply
            </button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t pt-4 mb-4">
          <div className="flex justify-between text-gray-700">
            <span>Price:</span>
            <span>₹{price}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Delivery Fee:</span>
            <span>₹{deliveryFee}</span>
          </div>
          {promoCode && promoCode === "DISCOUNT10" && (
            <div className="flex justify-between text-green-600">
              <span>Discount Applied:</span>
              <span>-₹{price * 0.1}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-lg mt-2">
            <span>Total:</span>
            <span>₹{discountedPrice + deliveryFee}</span>
          </div>
        </div>

        {/* Pay Now Button */}
        <button
          className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition duration-200"
          onClick={() => alert("Proceed to Paytm Payment")}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
