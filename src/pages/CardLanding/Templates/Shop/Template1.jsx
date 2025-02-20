import React from "react";

const Template1 = () => {
  // Hardcoded shop data (simulating data from a database)
  const shopData = {
    logo: "https://via.placeholder.com/150", // Placeholder logo URL
    otherPictures: [
      "https://via.placeholder.com/400x200",
      "https://via.placeholder.com/400x200",
    ], // Placeholder image URLs
    productCategories: [
      { name: "Electronics", image: "https://via.placeholder.com/200" },
      { name: "Clothing", image: "https://via.placeholder.com/200" },
      { name: "Accessories", image: null }, // Optional image
    ],
    businessHours: {
      Monday: { open: true, openingTime: "09:00", closingTime: "18:00" },
      Tuesday: { open: true, openingTime: "09:00", closingTime: "18:00" },
      Wednesday: { open: true, openingTime: "09:00", closingTime: "18:00" },
      Thursday: { open: true, openingTime: "09:00", closingTime: "18:00" },
      Friday: { open: true, openingTime: "09:00", closingTime: "18:00" },
      Saturday: { open: false, openingTime: "", closingTime: "" },
      Sunday: { open: false, openingTime: "", closingTime: "" },
    },
    inquiryPreference: "whatsapp", // Inquiry preference
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
    logo: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "20px",
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
    gallery: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    galleryImage: {
      width: "100%",
      maxWidth: "400px",
      height: "200px",
      borderRadius: "10px",
      objectFit: "cover",
    },
    categories: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
    },
    categoryCard: {
      backgroundColor: "#fff",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      width: "200px",
    },
    categoryImage: {
      width: "100%",
      height: "150px",
      borderRadius: "10px",
      objectFit: "cover",
      marginBottom: "10px",
    },
    businessHours: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "10px",
    },
    day: {
      backgroundColor: "#fff",
      padding: "10px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    inquiryPreference: {
      backgroundColor: "#fff",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <img src={shopData.logo} alt="Shop Logo" style={styles.logo} />
        <h1>Welcome to Our Shop</h1>
      </div>

      {/* Other Pictures */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Gallery</h2>
        <div style={styles.gallery}>
          {shopData.otherPictures.map((picture, index) => (
            <img
              key={index}
              src={picture}
              alt={`Shop Picture ${index + 1}`}
              style={styles.galleryImage}
            />
          ))}
        </div>
      </div>

      {/* Product Categories */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Product Categories</h2>
        <div style={styles.categories}>
          {shopData.productCategories.map((category, index) => (
            <div key={index} style={styles.categoryCard}>
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  style={styles.categoryImage}
                />
              )}
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Business Hours</h2>
        <div style={styles.businessHours}>
          {Object.entries(shopData.businessHours).map(([day, hours]) => (
            <div key={day} style={styles.day}>
              <strong>{day}:</strong>{" "}
              {hours.open
                ? `${hours.openingTime} - ${hours.closingTime}`
                : "Closed"}
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Preference */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Contact Us</h2>
        <div style={styles.inquiryPreference}>
          <p>
            Preferred method of inquiry:{" "}
            <strong>{shopData.inquiryPreference}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Template1;