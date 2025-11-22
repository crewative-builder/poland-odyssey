import React from "react";
import { Sun, Moon, Map, Settings, Search } from "lucide-react";
import appStore from "../../store/appStore";

const TopBar = () => {
  const { isDarkMode, toggleTheme } = appStore();

  const buttonStyle =
    "p-3 rounded-full shadow-lg transition duration-200 backdrop-blur-sm";
  const iconStyle = "w-6 h-6";

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30">
      <div
        className={`flex items-center space-x-4 p-2 rounded-full 
          ${
            isDarkMode
              ? "bg-gray-800/80 text-white"
              : "bg-white/80 text-gray-800"
          } 
          shadow-xl border ${
            isDarkMode ? "border-indigo-600" : "border-gray-300"
          }`}
      >
        {/* Logo/Title */}
        <div
          className={`px-4 py-2 font-mono text-lg font-bold rounded-full ${
            isDarkMode ? "bg-indigo-700 text-white" : "bg-indigo-500 text-white"
          }`}
        >
          🇵🇱 Odyssey
        </div>

        {/* Configuration Buttons */}

        {/* Theme Toggle (Dark/Light Mode) */}
        <button
          onClick={toggleTheme}
          className={`${buttonStyle} ${
            isDarkMode
              ? "hover:bg-indigo-600 bg-gray-700"
              : "hover:bg-gray-200 bg-white"
          }`}
          title="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className={iconStyle} />
          ) : (
            <Moon className={iconStyle} />
          )}
        </button>

        {/* Map Mode Toggle (Future) */}
        <button
          className={`${buttonStyle} ${
            isDarkMode
              ? "hover:bg-indigo-600 bg-gray-700"
              : "hover:bg-gray-200 bg-white"
          }`}
          onClick={() => console.log("Future: Toggle Map Mode")}
          title="Toggle Map Mode (2D/3D)"
        >
          <Map className={iconStyle} />
        </button>

        {/* Search (Future) */}
        <button
          className={`${buttonStyle} ${
            isDarkMode
              ? "hover:bg-indigo-600 bg-gray-700"
              : "hover:bg-gray-200 bg-white"
          }`}
          onClick={() => console.log("Future: Open Search")}
          title="Search"
        >
          <Search className={iconStyle} />
        </button>

        {/* Settings (Future) */}
        <button
          className={`${buttonStyle} ${
            isDarkMode
              ? "hover:bg-indigo-600 bg-gray-700"
              : "hover:bg-gray-200 bg-white"
          }`}
          onClick={() => console.log("Future: Open Settings")}
          title="Settings"
        >
          <Settings className={iconStyle} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
