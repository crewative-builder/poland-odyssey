import React from "react";
import { X } from "lucide-react";
import appStore from "../../store/appStore";
import placesData from "../../data/places.json";

const Sidebar = () => {
  const { selectedPlaceId, closeSidebar } = appStore();
  const place = placesData.find((p) => p.id === selectedPlaceId);

  if (!place) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 p-6 overflow-y-auto">
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
      >
        <X size={24} />
      </button>

      <h2 className="text-2xl font-bold mt-8 mb-4">{place.name}</h2>
      <p className="text-gray-600 mb-6">{place.description}</p>

      {place.youtubeId && (
        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black mb-6">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${place.youtubeId}`}
            title="YouTube video"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
