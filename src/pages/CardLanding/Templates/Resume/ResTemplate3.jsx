import React from "react";

const ResTemplate3 = () => {
  // Hardcoded student profile data (simulating data from the form submission)
  const studentData = {
    profilePicture: "https://via.placeholder.com/150", // Placeholder image URL
    coverPicture: "https://via.placeholder.com/800x200", // Placeholder image URL
    description:
      "A passionate and dedicated student with a strong interest in technology and innovation. Always eager to learn and grow!",
    address: "123 Main Street, City, Country",
    skills: ["JavaScript", "React", "Python", "UI/UX Design"],
    hobbies: ["Reading", "Coding", "Traveling", "Photography"],
    links: [
      { label: "GitHub", url: "https://github.com/example" },
      { label: "LinkedIn", url: "https://linkedin.com/in/example" },
    ],
    certifications: [
      "React Certification - Udemy",
      "Python for Data Science - Coursera",
    ],
    languages: ["English", "Spanish", "French"],
    organizations: ["Tech Club", "Coding Society"],
    achievements: [
      "Won 1st place in Hackathon 2023",
      "Published a research paper on AI",
    ],
  };

  // CSS Styles
  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    coverPicture: {
      width: "100%",
      height: "200px",
      borderRadius: "10px",
      objectFit: "cover",
      marginBottom: "20px",
    },
    profilePicture: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
      margin: "-75px auto 20px",
      border: "5px solid #fff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    section: {
      marginBottom: "30px",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333",
    },
    description: {
      fontSize: "16px",
      lineHeight: "1.6",
      color: "#555",
      textAlign: "center",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
    },
    card: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    list: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    listItem: {
      marginBottom: "10px",
      fontSize: "16px",
      color: "#555",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      {/* Cover Picture */}
      <img
        src={studentData.coverPicture}
        alt="Cover"
        style={styles.coverPicture}
      />

      {/* Profile Picture */}
      <img
        src={studentData.profilePicture}
        alt="Profile"
        style={styles.profilePicture}
      />

      {/* Header */}
      <div style={styles.header}>
        <h1>Student Profile</h1>
      </div>

      {/* Description */}
      <div style={styles.section}>
        <p style={styles.description}>{studentData.description}</p>
      </div>

      {/* Address */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Address</h2>
        <div style={styles.card}>
          <p style={styles.listItem}>{studentData.address}</p>
        </div>
      </div>

      {/* Skills */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Skills</h2>
        <div style={styles.grid}>
          {studentData.skills.map((skill, index) => (
            <div key={index} style={styles.card}>
              <p style={styles.listItem}>{skill}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hobbies */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Hobbies</h2>
        <div style={styles.grid}>
          {studentData.hobbies.map((hobby, index) => (
            <div key={index} style={styles.card}>
              <p style={styles.listItem}>{hobby}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Links</h2>
        <div style={styles.grid}>
          {studentData.links.map((link, index) => (
            <div key={index} style={styles.card}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Certifications</h2>
        <div style={styles.grid}>
          {studentData.certifications.map((certification, index) => (
            <div key={index} style={styles.card}>
              <p style={styles.listItem}>{certification}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Languages</h2>
        <div style={styles.grid}>
          {studentData.languages.map((language, index) => (
            <div key={index} style={styles.card}>
              <p style={styles.listItem}>{language}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Organizations */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Organizations</h2>
        <div style={styles.grid}>
          {studentData.organizations.map((organization, index) => (
            <div key={index} style={styles.card}>
              <p style={styles.listItem}>{organization}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Achievements</h2>
        <div style={styles.grid}>
          {studentData.achievements.map((achievement, index) => (
            <div key={index} style={styles.card}>
              <p style={styles.listItem}>{achievement}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResTemplate3;