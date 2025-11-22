import MapContainer from "./components/map/MapContainer";
import Sidebar from "./components/ui/Sidebar";
import TopBar from "./components/ui/TopBar"; // New Import
import appStore from "./store/appStore";

function App() {
  const { isDarkMode } = appStore(); // Get dark mode state

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <TopBar /> {/* New Component */}
      <MapContainer />
      <Sidebar />
    </div>
  );
}

export default App;
