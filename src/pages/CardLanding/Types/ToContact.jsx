import React, { useState,useEffect } from "react";

function ContactInput({ contact, setContact }) {
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="company"
            value={contact.company}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="tel"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">GSTN</label>
          <input
            type="text"
            name="gstn"
            value={contact.gstn}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter GSTN"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={contact.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter address"
            rows="3"
          ></textarea>
        </div>
      </div>
    </div>
  );
}



function ContactPreview({ contact, landing }) { 
  useEffect(() => {
    if (landing) {
      const vCardData = `
            BEGIN:VCARD
            VERSION:3.0
            FN:${contact.name || "N/A"}
            ORG:${contact.company || "N/A"}
            TEL:${contact.phone || ""}
            EMAIL:${contact.email || ""}
            ADR:${contact.address || ""}
            NOTE:GSTN: ${contact.gstn || "N/A"}
            END:VCARD
            `;
      const blob = new Blob([vCardData], { type: "text/vcard" });
      const vcfUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = vcfUrl;
      link.download = `${contact.name || "contact"}.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(vcfUrl);
    }
  }, [landing, contact]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Info</h2>
      <div className="space-y-2">
        <p><span className="font-medium">Name:</span> {contact.name || "N/A"}</p>
        <p><span className="font-medium">Company:</span> {contact.company || "N/A"}</p>
        <p><span className="font-medium">Contact:</span> {contact.phone || "N/A"}</p>
        <p><span className="font-medium">Email:</span> {contact.email || "N/A"}</p>
        <p><span className="font-medium">Address:</span> {contact.address || "N/A"}</p>
        <p><span className="font-medium">GSTN:</span> {contact.gstn || "N/A"}</p>
      </div>
    </div>
  );
}




export { ContactInput, ContactPreview };
