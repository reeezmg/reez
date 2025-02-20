import React, { useState } from 'react';
import { Trash2 } from "lucide-react";
import Select from 'react-select';
export function Links({profileInfo, setProfileInfo,links, setLinks}) {
 
    const websites = [
      "Facebook", "Twitter", "LinkedIn", "Instagram", "GitHub", "YouTube", "Reddit", "TikTok", "Snapchat", "Pinterest", 
      "Tumblr", "Flickr", "Medium", "Quora", "DeviantArt", "Vimeo", "Dribbble", "Behance", "SoundCloud", "Spotify", 
      "Twitch", "Discord", "WhatsApp", "WeChat", "Telegram", "Mastodon", "Blogger", "WordPress", "Meetup", "Goodreads",
      "Stack Overflow", "CodePen", "HackerRank", "LeetCode", "Kaggle", "Bitbucket", "GitLab", "Mixcloud", "Last.fm", "Bandcamp",
      "AngelList", "Product Hunt", "Foursquare", "Kickstarter", "GoFundMe", "Etsy", "eBay", "Amazon", "Coursera", "Udemy",
      "Khan Academy", "edX", "Skillshare", "Trello", "Notion", "Evernote", "Asana", "ClickUp", "Monday.com", "Dropbox", "Google Drive"
    ].map(site => ({ value: site, label: site }));
  
    // Add a new link
    const addLink = () => {
      setLinks([...links, { site: "", url: "" }]);
    };
  
    // Update a specific link
    const updateLink = (index, field, value) => {
      const newLinks = links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      );
      setLinks(newLinks);
    };
  
    // Remove a specific link
    const removeLink = (index) => {
      setLinks(links.filter((_, i) => i !== index));
    };
  
    // Handle file input for profile picture
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          setProfileInfo({ ...profileInfo, profilePicture: file });
      }
    };
    const handleBioFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log(file)
          setProfileInfo({ ...profileInfo, backgroundImage: file });
      }
    };
  
    return (
      <div className="p-4 max-w-xl mx-auto">
        {/* Profile Information Section */}
        <div className="mb-4">
          <input
            type="text"
            value={profileInfo.name}
            onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
            placeholder="Enter Name"
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="text"
            value={profileInfo.phone}
            onChange={(e) => setProfileInfo({ ...profileInfo, phone: e.target.value })}
            placeholder="Enter Phone Number"
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="text"
            value={profileInfo.email}
            onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
            placeholder="Enter Email"
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="text"
            value={profileInfo.address}
            onChange={(e) => setProfileInfo({ ...profileInfo, address: e.target.value })}
            placeholder="Enter address"
            className="p-2 border rounded w-full mb-2"
          />

        <input
            type="text"
            value={profileInfo.Bio}
            onChange={(e) => setProfileInfo({ ...profileInfo, bio: e.target.value })}
            placeholder="Enter Bio"
            className="p-2 border rounded w-full mb-2"
          />
          
          {/* File input for profile picture */}
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*" // Accept only image files
            className="p-2 border rounded w-full mb-2"
          />

          <input
            type="file"
            onChange={handleBioFileChange}
            accept="image/*" // Accept only image files
            className="p-2 border rounded w-full mb-2"
          />
        </div>
  
        {/* Add Link Button */}
        <button onClick={addLink} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Link</button>
        
        {/* Render Links */}
        <div className="mt-4 space-y-4">
          {links.map((link, index) => (
            <div key={index} className="p-4 flex flex-col space-y-2 border rounded-lg shadow-md bg-white">
              <Select
                value={websites.find(site => site.value === link.site) || ""}
                onChange={(selectedOption) => updateLink(index, "site", selectedOption.value)}
                options={[...websites, { value: "Email", label: "Email" }, { value: "Phone Number", label: "Phone Number" }]}
                className="w-60"
                isSearchable
              />
              <input
                type="text"
                value={link.url}
                onChange={(e) => updateLink(index, "url", e.target.value)}
                placeholder="Enter Profile URL / Email / Phone Number"
                className="p-2 border rounded w-full"
              />
              <button onClick={() => removeLink(index)} className="bg-red-500 text-white p-2 rounded self-end">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export function ProfilePreview({ profileInfo, links, landing }) {
    return (
      <div className="p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center justify-center border-b pb-4 mb-6">
          {/* Background Image */}
          <div
              className="w-full h-48 bg-gray-200 bg-cover rounded-lg mb-4"
              style={{
                backgroundImage: `url(${
                  landing
                    ? `https://unifeed.s3.ap-south-1.amazonaws.com/${profileInfo.backgroundImage}`
                    : profileInfo.backgroundImage instanceof File
                    ? URL.createObjectURL(profileInfo.backgroundImage)
                    : profileInfo.backgroundImage
                })`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              />

          
          {/* Profile Picture */}
          <img
            src={
              landing
                ? `https://unifeed.s3.ap-south-1.amazonaws.com/${profileInfo.profilePicture}`
                : profileInfo.profilePicture instanceof File
                ? URL.createObjectURL(profileInfo.profilePicture)
                : profileInfo.profilePicture
            }
            alt={""}
            className="w-32 h-32 rounded-full border-4 border-white -mt-16 shadow-md object-cover"
          />
          {/* Profile Name */}
          <h3 className="text-xl font-semibold text-gray-800 mt-4">{profileInfo.name || "Name not provided"}</h3>
          
          {/* Phone, Email, and Address */}
          <div className="text-center mt-2 space-y-1">
            {profileInfo.phone && <p className="text-sm text-gray-600">{profileInfo.phone}</p>}
            {profileInfo.email && <p className="text-sm text-gray-600">{profileInfo.email}</p>}
            {profileInfo.address && <p className="text-sm text-gray-600">{profileInfo.address}</p>}
          </div>
          
          {/* Bio or Additional Info */}
          <p className="text-sm text-gray-500 mt-4">{profileInfo.bio || "Your bio or description goes here..."}</p>
        </div>
  
        {/* Links Section */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <div key={index} className="flex items-center space-x-4 border-b py-3">
              {/* Link Icon */}
              <div className="flex justify-center items-center w-8 h-8 rounded-full bg-blue-500 text-white">
                <i className={`fab fa-${link.site.toLowerCase()}`} />
              </div>
              {/* Link Information */}
              <div className="flex-1">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-lg"
                >
                  {link.site || "No site selected"}
                </a>
                <p className="text-sm text-gray-400 mt-1">{link.url}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }