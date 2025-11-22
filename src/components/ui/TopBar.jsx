import React, { useState } from "react";
import { Sun, Moon, Map, Search, X } from "lucide-react";
import appStore from "../../store/appStore";
import placesData from "../../data/places.json";

const TopBar = () => {
  const { isDarkMode, toggleTheme, closeSidebar, openSidebar } = appStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Simple search function
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.length > 1) {
      const results = placesData.filter((place) =>
        place.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const buttonStyle =
    "p-3 rounded-full shadow-lg transition duration-200 backdrop-blur-sm";
  const iconStyle = "w-6 h-6";

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30">
      <div
        className={`flex items-center space-x-4 p-2 rounded-full 
          ${
            isDarkMode
              ? "bg-gray-800/80 text-white shadow-indigo-900/50"
              : "bg-white/90 text-gray-800 shadow-gray-400/50"
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

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search places..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className={`py-2 pl-10 pr-4 rounded-full w-48 transition duration-200 
              ${
                isDarkMode
                  ? "bg-gray-700/70 text-white border-indigo-700"
                  : "bg-gray-100/70 text-gray-800 border-gray-300"
              } 
              focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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

        {/* Map Mode Toggle (Placeholder) */}
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
      </div>

      {/* Search Results Dropdown */}
      {searchResults.length > 0 && (
        <div
          className={`absolute top-full mt-2 w-full max-h-60 overflow-y-auto rounded-lg shadow-xl 
          ${
            isDarkMode
              ? "bg-gray-800 border-indigo-600"
              : "bg-white border-gray-300"
          } border ring-2 ring-indigo-500`}
        >
          {searchResults.map((place) => (
            <button
              key={place.id}
              onClick={() => {
                openSidebar(place.id);
                setSearchResults([]);
                setSearchTerm(place.name);
              }}
              className="w-full text-left p-3 hover:bg-indigo-500 hover:text-white transition duration-150"
            >
              {place.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopBar;
