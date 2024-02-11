import React from "react";
import { FaArrowDown } from "react-icons/fa";

const NotValidScreenSize = () => {
  // Use a more accurate mobile check (consider media queries or viewport size)
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const handleMinimize = () => {
    // No scrolling functionality needed in this version
  };

  const handleSwitchToDesktop = () => {
    // No switching functionality needed in this version
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div className="text-white text-center">
        <h1 className="text-3xl font-bold mb-4 p-4">Oppss!!!</h1>
        <h1 className="text-2xl font-semibold mb-4 p-4">Screen Size Is Not Enough</h1>
        <p className="mb-4">
          {isMobile ? (
            <>
              <p className="p-4 text-md">
              
                Please minimize the screen or go for desktop mode in your mobile
                phone.
              </p>
            </>
          ) : (
            "Please minimize the screen size."
          )}
        </p>
      </div>
    </div>
  );
};

export default NotValidScreenSize;
