import React from "react";
import { X } from "lucide-react";
import appStore from "../../store/appStore";
import placesData from "../../data/places.json";

const Sidebar = () => {
  const { selectedPlaceId, closeSidebar } = appStore();
  const place = placesData.find((p) => p.id === selectedPlaceId);

  if (!place) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 p-6 overflow-y-auto border-l border-slate-100">
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors"
      >
        <X size={24} className="text-slate-500" />
      </button>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800">
        {place.name}
      </h2>
      <p className="text-slate-600 leading-relaxed mb-6">{place.description}</p>

      {place.youtubeId && (
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 shadow-inner">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${place.youtubeId}`}
            title="Video"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
