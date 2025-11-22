import React, { useState } from "react";
import { X, Globe, Video } from "lucide-react";
import appStore from "../../store/appStore";
import placesData from "../../data/places.json";

// Component to embed the YouTube video
const YoutubeEmbed = ({ id }) => (
  <div
    className="relative overflow-hidden w-full"
    style={{ paddingTop: "56.25%" /* 16:9 Aspect Ratio */ }}
  >
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src={`https://www.youtube.com/embed/${id}?autoplay=1`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded Youtube Video"
    />
  </div>
);

const Sidebar = () => {
  const { selectedPlaceId, closeSidebar, isDarkMode } = appStore();
  const [showVideo, setShowVideo] = useState(false); // State for video toggle

  const place = placesData.find((p) => p.id === selectedPlaceId);

  // Reset showVideo state when a new place is selected
  React.useEffect(() => {
    setShowVideo(false);
  }, [selectedPlaceId]);

  const sidebarClass = `
    fixed top-0 right-0 h-full w-96 shadow-2xl z-40 
    transition-transform duration-300 
    
    // Theme-Aware Styles
    dark:bg-slate-900/95 dark:text-white bg-white/95 text-gray-900 backdrop-blur-sm
    
    ${selectedPlaceId ? "translate-x-0" : "translate-x-full"}
  `;

  if (!place) return null;

  return (
    <div className={sidebarClass}>
      <div className="p-6 h-full flex flex-col">
        {/* --- Header & Close Button --- */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b dark:border-slate-700 border-gray-300">
          <h2 className="text-3xl font-serif text-amber-500 dark:text-amber-300">
            {place.name}
          </h2>
          <button
            onClick={closeSidebar}
            className="dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700 text-gray-500 hover:text-black hover:bg-gray-100 p-1 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* --- Image/Video Display Section --- */}
        <div className="w-full bg-slate-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          {showVideo && place.youtubeId ? (
            <YoutubeEmbed id={place.youtubeId} />
          ) : (
            <div className="h-48 w-full flex items-center justify-center">
              {/* Placeholder image tag or static placeholder */}
              <Globe size={64} className="text-slate-600" />
            </div>
          )}
        </div>

        {/* --- Place Details --- */}
        <p className="dark:text-slate-300 text-gray-700 mb-6 flex-grow">
          {place.description}
        </p>

        {/* --- Action Buttons --- */}
        <div className="mt-auto space-y-3">
          {/* Show Video Button */}
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-150 shadow-lg flex items-center justify-center space-x-2"
            onClick={() => setShowVideo(!showVideo)}
          >
            <Video size={20} />
            <span>{showVideo ? "Hide Video" : "Show Video"}</span>
          </button>

          {/* 3D View Button */}
          <button
            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition duration-150 shadow-lg"
            onClick={() => console.log("Future: Enter 3D View")}
          >
            Enter 3D View (Phase 3)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
