import React from "react";
import MapContainer from "./components/map/MapContainer";
import Sidebar from "./components/ui/Sidebar";

function App() {
  return (
    <main className="relative w-screen h-screen bg-slate-50">
      {/* Just the Map */}
      <MapContainer />

      {/* Just the Sidebar */}
      <Sidebar />

      {/* Simple Overlay Title */}
      <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-lg shadow-md pointer-events-none">
        <h1 className="text-xl font-bold text-slate-800">🇵🇱 Poland Odyssey</h1>
      </div>
    </main>
  );
}

export default App;
