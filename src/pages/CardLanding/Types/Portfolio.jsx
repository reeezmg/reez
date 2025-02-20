import React, { useState } from "react";

const Portfolio = ({ studentInfo, setStudentInfo }) => {
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  // Handle file uploads (profile and cover pictures)
  const handleFileChange = (e, field) => {
    setStudentInfo({ ...studentInfo, [field]: e.target.files[0] });
  };

  // Add and remove dynamic fields
  const addField = (field) => {
    setStudentInfo({ ...studentInfo, [field]: [...studentInfo[field], ""] });
  };

  const removeField = (field, index) => {
    const updatedFields = studentInfo[field].filter((_, i) => i !== index);
    setStudentInfo({ ...studentInfo, [field]: updatedFields });
  };

  // Handle changes in dynamic fields
  const handleDynamicFieldChange = (e, field, index) => {
    const updatedFields = [...studentInfo[field]];
    updatedFields[index] = e.target.value;
    setStudentInfo({ ...studentInfo, [field]: updatedFields });
  };

  // Handle changes in links (label and URL)
  const handleLinkChange = (e, index, field) => {
    const updatedLinks = [...studentInfo.links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: e.target.value };
    setStudentInfo({ ...studentInfo, links: updatedLinks });
  };

  // Handle changes in academics
  const handleAcademicChange = (e, index, field) => {
    const updatedAcademics = [...studentInfo.academics];
    updatedAcademics[index] = { ...updatedAcademics[index], [field]: e.target.value };
    setStudentInfo({ ...studentInfo, academics: updatedAcademics });
  };

  // Add a new academic entry
  const addAcademicEntry = () => {
    setStudentInfo({
      ...studentInfo,
      academics: [...studentInfo.academics, { name: "", courseName: "", yearOfStudies: "" }],
    });
  };

  // Remove an academic entry
  const removeAcademicEntry = (index) => {
    const updatedAcademics = studentInfo.academics.filter((_, i) => i !== index);
    setStudentInfo({ ...studentInfo, academics: updatedAcademics });
  };

  // Handle changes in experience
  const handleExperienceChange = (e, index, field) => {
    const updatedExperiences = [...studentInfo.experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: e.target.value };
    setStudentInfo({ ...studentInfo, experiences: updatedExperiences });
  };

  // Add a new experience entry
  const addExperienceEntry = () => {
    setStudentInfo({
      ...studentInfo,
      experiences: [...studentInfo.experiences, { from: "", to: "", companyName: "", description: "" }],
    });
  };

  // Remove an experience entry
  const removeExperienceEntry = (index) => {
    const updatedExperiences = studentInfo.experiences.filter((_, i) => i !== index);
    setStudentInfo({ ...studentInfo, experiences: updatedExperiences });
  };

  // Handle changes in works
  const handleWorkChange = (e, index, field) => {
    const updatedWorks = [...studentInfo.works];
    updatedWorks[index] = { ...updatedWorks[index], [field]: e.target.value };
    setStudentInfo({ ...studentInfo, works: updatedWorks });
  };

  // Add a new work entry
  const addWorkEntry = () => {
    setStudentInfo({
      ...studentInfo,
      works: [...studentInfo.works, { link: "", description: "" }],
    });
  };

  // Remove a work entry
  const removeWorkEntry = (index) => {
    const updatedWorks = studentInfo.works.filter((_, i) => i !== index);
    setStudentInfo({ ...studentInfo, works: updatedWorks });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Profile:", studentInfo);
    alert("Profile submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Student Profile Form</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={studentInfo.name || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Profession */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Profession</label>
            <input
              type="text"
              name="profession"
              value={studentInfo.profession || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "profilePicture")}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={studentInfo.description}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={studentInfo.address}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={studentInfo.phone || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={studentInfo.email || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Academics */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Academics</label>
            {studentInfo.academics.map((academic, index) => (
              <div key={index} className="space-y-2 mt-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={academic.name || ""}
                  onChange={(e) => handleAcademicChange(e, index, "name")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Course Name"
                  value={academic.courseName || ""}
                  onChange={(e) => handleAcademicChange(e, index, "courseName")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Year of Studies"
                  value={academic.yearOfStudies || ""}
                  onChange={(e) => handleAcademicChange(e, index, "yearOfStudies")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeAcademicEntry(index)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addAcademicEntry}
              className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Academic Entry
            </button>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            {studentInfo.experiences.map((experience, index) => (
              <div key={index} className="space-y-2 mt-2">
                <input
                  type="text"
                  placeholder="From (e.g., Jan 2020)"
                  value={experience.from || ""}
                  onChange={(e) => handleExperienceChange(e, index, "from")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="To (e.g., Dec 2022)"
                  value={experience.to || ""}
                  onChange={(e) => handleExperienceChange(e, index, "to")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={experience.companyName || ""}
                  onChange={(e) => handleExperienceChange(e, index, "companyName")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <textarea
                  placeholder="Description"
                  value={experience.description || ""}
                  onChange={(e) => handleExperienceChange(e, index, "description")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeExperienceEntry(index)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addExperienceEntry}
              className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Experience Entry
            </button>
          </div>

          {/* Works */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Works</label>
            {studentInfo.works.map((work, index) => (
              <div key={index} className="space-y-2 mt-2">
                <input
                  type="text"
                  placeholder="Link (e.g., GitHub URL)"
                  value={work.link || ""}
                  onChange={(e) => handleWorkChange(e, index, "link")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <textarea
                  placeholder="Description"
                  value={work.description || ""}
                  onChange={(e) => handleWorkChange(e, index, "description")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeWorkEntry(index)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addWorkEntry}
              className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Work Entry
            </button>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Skills</label>
            {studentInfo.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleDynamicFieldChange(e, "skills", index)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeField("skills", index)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("skills")}
              className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Skill
            </button>
          </div>

          {/* Hobbies */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Hobbies</label>
            {studentInfo.hobbies.map((hobby, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={hobby}
                  onChange={(e) => handleDynamicFieldChange(e, "hobbies", index)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeField("hobbies", index)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("hobbies")}
              className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Hobby
            </button>
          </div>

          {/* Links */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Links</label>
            {studentInfo.links.map((link, index) => (
              <div key={index} className="space-y-2 mt-2">
                <input
                  type="text"
                  placeholder="Label"
                  value={link.label || ""}
                  onChange={(e) => handleLinkChange(e, index, "label")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="URL"
                  value={link.url || ""}
                  onChange={(e) => handleLinkChange(e, index, "url")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeField("links", index)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("links")}
              className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Link
            </button>
          </div>

           {/* Certifications */}
           <div>
            <label className="block text-sm font-medium text-gray-700">Certifications</label>
            {studentInfo.certifications.map((certification, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={certification}
                  onChange={(e) => handleDynamicFieldChange(e, "certifications", index)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeField("certifications", index)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("certifications")}
              className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Certification
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Portfolio;
