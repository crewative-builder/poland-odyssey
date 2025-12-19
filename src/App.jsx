import React from "react";
import MapContainer from "./components/map/MapContainer";
import Sidebar from "./components/ui/Sidebar";
import TopBar from "./components/ui/TopBar";

function App() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <TopBar />
      <MapContainer />
      <Sidebar />
    </main>
  );
}

export default App;
