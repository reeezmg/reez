import React from "react";

function VPlain({ isFlipped, textColor, bgColor, logo, companyName, name, subtitle, QRCodeCanvas }) {
  return (
    <div className="relative w-48 h-80 rounded-lg shadow-lg border p-4 perspective-1000"
    style={{ backgroundColor: bgColor }}
    >   
      {/* Front Side */}
      <div
        className={`absolute inset-0 flex flex-col justify-between p-4 ${
          isFlipped ? "hidden" : "flex"
        }`}
        style={{
          color: textColor,
          backfaceVisibility: "hidden",
        }}
      >
        <div className="flex flex-col items-center">
          {logo && <img src={logo} alt="Logo" className="w-16 h-16 mb-2" />}
          {companyName && <h3 className="text-lg font-bold text-center">{companyName}</h3>}
        </div>

        <div className="text-center">
          <h3 className="text-lg font-bold">{name || "Your Name"}</h3>
          <p className="text-sm">{subtitle || "Subtitle"}</p>
        </div>
      </div>

      {/* Back Side */}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center ${
          isFlipped ? "flex" : "hidden"
        }`}
        style={{
          color: textColor,
          transform: "rotateY(180deg)",
        }}
      >
        <QRCodeCanvas
          value="https://example.com"
          size={100} // Increased size for better visibility
          className="self-center"
          bgColor={bgColor} // Background color
          fgColor={textColor} // Foreground (QR code) color
        />
      </div>
      
    </div>
  );
}

export default VPlain;
