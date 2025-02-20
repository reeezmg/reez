import React, { useState } from "react";
import { motion } from "framer-motion";
import Abstract1 from "./CardTemplate/Abstract1";
import Abstract2 from "./CardTemplate/Abstract2";
import Abstract3 from "./CardTemplate/Abstract3";
import Abstract4 from "./CardTemplate/Abstract4";

const cardComponents = [
  { component: Abstract1, name: "Abstract1" },
  { component: Abstract2, name: "Abstract2" },
  { component: Abstract3, name: "Abstract3" },
  { component: Abstract4, name: "Abstract4" },
];

const DesignSelection = ({selectedCard, setSelectedCard, textColor, bgColor, logo, companyName, name:cardName, subtitle, QRCodeCanvas }) => {
  const [flippedStates, setFlippedStates] = useState(Array(cardComponents.length).fill(false));

  const handleFlip = (index) => {
    setFlippedStates((prev) => prev.map((state, i) => (i === index ? !state : state)));
  };

  const handleSelection = (cardName) => {
    setSelectedCard(cardName);
  };
  const cardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <div className="p-6">
      <h2 className="text-center text-2xl font-semibold mb-4">Select a Design</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {cardComponents.map(({ component: CardComponent, name }, index) => (
          <div key={index} className="flex flex-col items-center">
           <motion.div
            key={index}
            initial={false}
            animate={flippedStates[index] ? "back" : "front"}
            variants={cardVariants}
            transition={{ duration: 0.6 }}
            onClick={() => handleFlip(index)}
            className="cursor-pointer"
          >
             
            <CardComponent
              isFlipped={flippedStates[index]}
              textColor={textColor}
              bgColor={bgColor}
              logo={logo}
              companyName={companyName}
              name={cardName}
              subtitle={subtitle}
              QRCodeCanvas={QRCodeCanvas}
            />
           
          </motion.div>

            {/* Radio Button */}
            <label className="mt-3 flex items-center space-x-2">
              <input
                type="radio"
                name="designSelection"
                value={name}
                checked={selectedCard === name}
                onChange={() => handleSelection(name)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center transition-all ${
                  selectedCard === name ? "border-blue-500" : ""
                }`}
              >
                {selectedCard === name && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
              </div>
              <span className="text-gray-700">{name}</span>
            </label>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DesignSelection;
