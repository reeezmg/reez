import React from "react";

const PortfolioLanding = ({ studentInfo }) => {
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
       

        <div className="p-6">
          {/* Profile Picture & Name */}
          <div className="flex items-center space-x-6 mb-6">
            {studentInfo.profilePicture && (
              <img
                src={URL.createObjectURL(studentInfo.profilePicture)}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {studentInfo.name || "Student Name"}
              </h1>
              <p className="text-gray-600 text-lg">{studentInfo.profession || "Aspiring Professional"}</p>
            </div>
          </div>

          {/* Contact Information */}
          {studentInfo.email && (
            <p className="text-gray-700 text-md mb-4">
              <span className="font-semibold">Email:</span> {studentInfo.email}
            </p>
          )}
          {studentInfo.phone && (
            <p className="text-gray-700 text-md mb-4">
              <span className="font-semibold">Phone:</span> {studentInfo.phone}
            </p>
          )}
          {studentInfo.address && (
            <p className="text-gray-700 text-md mb-4">
              <span className="font-semibold">Address:</span> {studentInfo.address}
            </p>
          )}

          {/* Section: Summary */}
          {studentInfo.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Summary</h2>
              <p className="text-gray-700 mt-2">{studentInfo.description}</p>
            </div>
          )}

          {/* Section: Academics */}
          {studentInfo.academics && studentInfo.academics.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Education</h2>
              {studentInfo.academics.map((academic, index) => (
                <div key={index} className="mt-2">
                  <p className="text-gray-700 font-semibold">{academic.courseName} - {academic.name}</p>
                  <p className="text-gray-600">Year: {academic.yearOfStudies}</p>
                </div>
              ))}
            </div>
          )}

          {/* Section: Skills */}
          {studentInfo.skills && studentInfo.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Skills</h2>
              <ul className="flex flex-wrap gap-2 mt-2">
                {studentInfo.skills.map((skill, index) => (
                  <li key={index} className="bg-gray-300 px-3 py-1 rounded-full text-sm text-gray-800">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section: Certifications */}
          {studentInfo.certifications && studentInfo.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Certifications</h2>
              <ul className="list-disc list-inside mt-2">
                {studentInfo.certifications.map((certification, index) => (
                  <li key={index} className="text-gray-700">{certification}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Section: Achievements */}
          {studentInfo.achievements && studentInfo.achievements.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Achievements</h2>
              <ul className="list-disc list-inside mt-2">
                {studentInfo.achievements.map((achievement, index) => (
                  <li key={index} className="text-gray-700">{achievement}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Section: Languages */}
          {studentInfo.languages && studentInfo.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Languages</h2>
              <ul className="flex flex-wrap gap-2 mt-2">
                {studentInfo.languages.map((language, index) => (
                  <li key={index} className="bg-gray-300 px-3 py-1 rounded-full text-sm text-gray-800">
                    {language}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section: Links */}
          {studentInfo.links && studentInfo.links.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Links</h2>
              <ul className="mt-2 space-y-1">
                {studentInfo.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {link.label || link.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioLanding;
