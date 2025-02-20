import React from "react";

const Template3 = ({ shopInfo }) => {
  if (!shopInfo) {
    return <p className="text-center text-gray-500">No shop data available.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Shop Header */}
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center">
        {shopInfo.logo && (
          <img
            src={URL.createObjectURL(shopInfo.logo)}
            alt="Shop Logo"
            className="w-24 h-24 rounded-full mx-auto shadow-lg border-4 border-white"
          />
        )}
        <h1 className="text-3xl font-bold mt-4">{shopInfo.shopName || "Shop Name"}</h1>
        <p className="text-gray-300 mt-1">Inquiry via: {shopInfo.inquiryPreference}</p>
      </div>

      {/* Gallery Section */}
      {shopInfo.otherPictures.length > 0 && (
        <div className="mt-6 w-full max-w-3xl">
          <h2 className="text-xl font-semibold text-center mb-2">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {shopInfo.otherPictures.map((picture, index) => (
              <img
                key={index}
                src={URL.createObjectURL(picture)}
                alt={`Gallery ${index}`}
                className="w-full h-32 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
              />
            ))}
          </div>
        </div>
      )}

      {/* Product Categories */}
      {shopInfo.productCategories.length > 0 && (
        <div className="mt-6 w-full max-w-3xl">
          <h2 className="text-xl font-semibold text-center mb-2">Product Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {shopInfo.productCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white/10 p-3 rounded-xl shadow-md text-center backdrop-blur-lg transition-transform transform hover:scale-105"
              >
                {category.image && (
                  <img
                    src={URL.createObjectURL(category.image)}
                    alt={category.name}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                )}
                <p className="text-white font-medium mt-2">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Business Hours */}
      <div className="mt-6 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-center mb-2">Business Hours</h2>
        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-lg shadow-md">
          {Object.entries(shopInfo.businessHours).map(([day, hours]) => (
            <div key={day} className="flex justify-between py-1">
              <span className="font-medium">{day}</span>
              {hours.open ? (
                <span className="text-green-400">{hours.openingTime} - {hours.closingTime}</span>
              ) : (
                <span className="text-red-400">Closed</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Template3;
