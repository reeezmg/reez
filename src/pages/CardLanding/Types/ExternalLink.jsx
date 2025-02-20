import React, { useState } from "react";

const ExternalLink = ({externalLink, setExternalLink}) => {

  // Handle input change and update state dynamically
  const handleInputChange = (e) => {
    setExternalLink(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">External Link Preview</h1>
        
        {/* External Link Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Enter External Link</label>
          <input
            type="url"
            name="externalLink"
            value={externalLink}
            onChange={handleInputChange}
            placeholder="https://example.com"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

// Component to embed or display the link
const EmbedLink = ({ externalLink }) => {
 
  return (
    <div className="space-y-4">
        <iframe
          src={externalLink}
          title="Embedded Content"
          className="w-full h-screen rounded-lg"
          allowFullScreen
        />
    </div>
  );
};

export { ExternalLink, EmbedLink };
