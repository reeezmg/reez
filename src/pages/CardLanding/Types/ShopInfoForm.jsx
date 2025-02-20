import React, { useEffect, useState } from "react";

const ShopInfoForm = ({shopInfo, setShopInfo}) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShopInfo({ ...shopInfo, [name]: value });
  };

  const handleLogoChange = (e) => {
    setShopInfo({ ...shopInfo, logo: e.target.files[0] });
  };

  const handleOtherPicturesChange = (e, index) => {
    const newPictures = [...shopInfo.otherPictures];
    newPictures[index] = e.target.files[0];
    setShopInfo({ ...shopInfo, otherPictures: newPictures });
  };

  const addOtherPicture = () => {
    setShopInfo({ ...shopInfo, otherPictures: [...shopInfo.otherPictures, null] });
  };

  const removeOtherPicture = (index) => {
    const newPictures = shopInfo.otherPictures.filter((_, i) => i !== index);
    setShopInfo({ ...shopInfo, otherPictures: newPictures });
  };

  const handleProductCategoryChange = (e, index, field) => {
    const newCategories = [...shopInfo.productCategories];
    newCategories[index] = { ...newCategories[index], [field]: e.target.value };
    setShopInfo({ ...shopInfo, productCategories: newCategories });
  };

  const handleProductCategoryImageChange = (e, index) => {
    const newCategories = [...shopInfo.productCategories];
    newCategories[index] = { ...newCategories[index], image: e.target.files[0] };
    setShopInfo({ ...shopInfo, productCategories: newCategories });
  };

  const addProductCategory = () => {
    setShopInfo({
      ...shopInfo,
      productCategories: [...shopInfo.productCategories, { name: "", image: null }],
    });
  };

  const removeProductCategory = (index) => {
    const newCategories = shopInfo.productCategories.filter((_, i) => i !== index);
    setShopInfo({ ...shopInfo, productCategories: newCategories });
  };

  const handleBusinessHoursChange = (day, field, value) => {
    const updatedBusinessHours = {
      ...shopInfo.businessHours,
      [day]: { ...shopInfo.businessHours[day], [field]: value },
    };
    setShopInfo({ ...shopInfo, businessHours: updatedBusinessHours });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Shop Info:", shopInfo);
  };

  useEffect(() => {
    console.log(shopInfo)
  }, [shopInfo])
  

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-8">
      {/* Shop Logo */}
      <div className="space-y-4">
        <label className="block text-xl font-bold text-gray-700">Shop Logo:</label>
        <input
          type="file"
          onChange={handleLogoChange}
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={shopInfo.name}
            onChange={(e) => setShopInfo({...shopInfo,name:e.target.value})}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter full name"
          />
        </div>

      {/* Other Pictures */}
      <div className="space-y-4">
        <label className="block text-xl font-bold text-gray-700">Other Pictures:</label>
        {shopInfo.otherPictures.map((picture, index) => (
          <div key={index} className="flex items-center space-x-4">
            <input
              type="file"
              onChange={(e) => handleOtherPicturesChange(e, index)}
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              type="button"
              onClick={() => removeOtherPicture(index)}
              className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-full hover:bg-red-100"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addOtherPicture}
          className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100"
        >
          Add Picture
        </button>
      </div>

      {/* Product Categories */}
      <div className="space-y-4">
        <label className="block text-xl font-bold text-gray-700">Product Categories:</label>
        {shopInfo.productCategories.map((category, index) => (
          <div key={index} className="">
            <input
              type="text"
              placeholder="Category Name"
              value={category.name}
              onChange={(e) => handleProductCategoryChange(e, index, "name")}
              className="w-full  px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
           <div className="flex mt-3">
            <input
              type="file"
              onChange={(e) => handleProductCategoryImageChange(e, index)}
              accept="image/*"
              className="block  w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              type="button"
              onClick={() => removeProductCategory(index)}
              className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-full hover:bg-red-100"
            >
              X
            </button>
          </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addProductCategory}
          className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100"
        >
          Add Category
        </button>
      </div>

      {/* Business Hours */}
      <div className="space-y-4">
        <label className="block text-xl font-bold text-gray-700">Business Hours:</label>
        {Object.keys(shopInfo.businessHours).map((day) => (
          <div key={day} className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={shopInfo.businessHours[day].open}
              onChange={(e) => handleBusinessHoursChange(day, "open", e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="font-medium text-gray-700">{day}</span>
            {shopInfo.businessHours[day].open && (
              <>
                <input
                  type="time"
                  value={shopInfo.businessHours[day].openingTime}
                  onChange={(e) => handleBusinessHoursChange(day, "openingTime", e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="time"
                  value={shopInfo.businessHours[day].closingTime}
                  onChange={(e) => handleBusinessHoursChange(day, "closingTime", e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Inquiry Preference */}
      <div className="space-y-4">
        <label className="block text-xl font-bold text-gray-700">Inquiry Preference:</label>
        <select
          name="inquiryPreference"
          value={shopInfo.inquiryPreference}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="phone">Phone</option>
          <option value="mail">Mail</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </div>

      
    </form>
  );
};

export default ShopInfoForm;