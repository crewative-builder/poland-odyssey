import React from "react";
import { X, Globe } from "lucide-react";
import appStore from "../../store/appStore";
import placesData from "../../data/places.json";

const Sidebar = () => {
  const { selectedPlaceId, closeSidebar } = appStore();

  const place = placesData.find((p) => p.id === selectedPlaceId);

  const sidebarClass = `
    fixed top-0 right-0 h-full w-96 bg-slate-900/95 backdrop-blur-sm shadow-2xl z-20 
    transition-transform duration-300
    ${selectedPlaceId ? "translate-x-0" : "translate-x-full"}
  `;

  if (!place) return null;

  return (
    <div className={sidebarClass}>
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-700">
          <h2 className="text-3xl font-serif text-amber-300">{place.name}</h2>
          <button
            onClick={closeSidebar}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="w-full h-48 bg-slate-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <Globe size={64} className="text-slate-600" />
        </div>

        <p className="text-slate-300 mb-6 flex-grow">{place.description}</p>

        <div className="mt-auto">
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-150 shadow-lg"
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
