import React from "react";

const Template2 = ({ shopInfo }) => {
  if (!shopInfo) {
    return <p className="text-center text-gray-500">No shop data available.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Shop Header */}
      <div className="flex flex-col items-center text-center">
        {shopInfo.logo && (
          <img
            src={URL.createObjectURL(shopInfo.logo)}
            alt="Shop Logo"
            className="w-32 h-32 rounded-full shadow-md"
          />
        )}
        <h1 className="text-2xl font-bold mt-4">{shopInfo.shopName || "Shop Name"}</h1>
        <p className="text-gray-500">Inquiry via: {shopInfo.inquiryPreference}</p>
      </div>

      {/* Gallery Section */}
      {shopInfo.otherPictures.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {shopInfo.otherPictures.map((picture, index) => (
              <img
                key={index}
                src={URL.createObjectURL(picture)}
                alt={`Gallery ${index}`}
                className="w-full h-32 object-cover rounded-lg shadow-sm"
              />
            ))}
          </div>
        </div>
      )}

      {/* Product Categories */}
      {shopInfo.productCategories.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Product Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {shopInfo.productCategories.map((category, index) => (
              <div key={index} className="p-3 bg-gray-100 rounded-lg shadow-sm">
                {category.image && (
                  <img
                    src={URL.createObjectURL(category.image)}
                    alt={`Category ${category.name}`}
                    className="w-full h-24 object-cover rounded-md"
                  />
                )}
                <p className="text-center font-medium mt-2">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Business Hours */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Business Hours</h2>
        <div className="mt-2 bg-gray-100 p-4 rounded-lg">
          {Object.entries(shopInfo.businessHours).map(([day, hours]) => (
            <div key={day} className="flex justify-between py-1">
              <span className="font-medium">{day}</span>
              {hours.open ? (
                <span className="text-green-600">{hours.openingTime} - {hours.closingTime}</span>
              ) : (
                <span className="text-red-500">Closed</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Template2;
