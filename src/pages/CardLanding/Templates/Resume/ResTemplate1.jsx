import React from "react";

const ResTemplate1 = ({ studentInfo }) => {
  if (!studentInfo) {
    return <p>No profile data available.</p>;
  }

  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      maxWidth: "800px",
      margin: "20px auto",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    profileImage: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "10px",
    },
    coverImage: {
      width: "100%",
      height: "200px",
      borderRadius: "10px",
      objectFit: "cover",
      marginBottom: "20px",
    },
    section: {
      marginBottom: "15px",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "5px",
      display: "block",
    },
    list: {
      listStyle: "none",
      padding: 0,
    },
    listItem: {
      backgroundColor: "#f1f1f1",
      padding: "8px",
      borderRadius: "5px",
      marginBottom: "5px",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Student Profile</h1>

      {/* Cover Picture */}
      {studentInfo.coverPicture && (
        <img
          src={URL.createObjectURL(studentInfo.coverPicture)}
          alt="Cover"
          style={styles.coverImage}
        />
      )}

      {/* Profile Picture */}
      {studentInfo.profilePicture && (
        <div style={{ textAlign: "center" }}>
          <img
            src={URL.createObjectURL(studentInfo.profilePicture)}
            alt="Profile"
            style={styles.profileImage}
          />
        </div>
      )}

      {/* Description */}
      {studentInfo.description && (
        <div style={styles.section}>
          <span style={styles.label}>Description:</span>
          <p>{studentInfo.description}</p>
        </div>
      )}

      {/* Address */}
      {studentInfo.address && (
        <div style={styles.section}>
          <span style={styles.label}>Address:</span>
          <p>{studentInfo.address}</p>
        </div>
      )}

      {/* Dynamic Fields */}
      {[
        { label: "Skills", field: "skills" },
        { label: "Hobbies", field: "hobbies" },
        { label: "Certifications", field: "certifications" },
        { label: "Languages", field: "languages" },
        { label: "Organizations", field: "organizations" },
        { label: "Achievements", field: "achievements" },
      ].map(({ label, field }) =>
        studentInfo[field]?.length > 0 ? (
          <div key={field} style={styles.section}>
            <span style={styles.label}>{label}:</span>
            <ul style={styles.list}>
              {studentInfo[field].map((item, index) => (
                <li key={index} style={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null
      )}

      {/* Links */}
      {studentInfo.links?.length > 0 && (
        <div style={styles.section}>
          <span style={styles.label}>Links:</span>
          <ul style={styles.list}>
            {studentInfo.links.map((link, index) => (
              <li key={index} style={styles.listItem}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  {link.label || link.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResTemplate1;
