import MapContainer from "./components/map/MapContainer";
import Sidebar from "./components/ui/Sidebar";
import appStore from "./store/appStore";

function App() {
  const { isSidebarOpen } = appStore();

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <MapContainer />

      <Sidebar />
    </div>
  );
}

export default App;
