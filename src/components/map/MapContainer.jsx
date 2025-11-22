import React, { useRef, useEffect } from "react"; // CRITICAL: Hooks are correctly imported
import maplibregl from "maplibre-gl";
// NO CSS IMPORT HERE (Styles are imported in src/index.css)
import placesData from "../../data/places.json";
import appStore from "../../store/appStore";

// Poland geographical center
const POLAND_CENTER = [19.15, 51.92];

const MapContainer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const { openSidebar, isDarkMode } = appStore();
  const markerRefs = useRef([]); // Use a ref to keep track of markers

  // 1. EFFECT for Initial Map Setup (Runs ONCE)
  useEffect(() => {
    if (map.current) return;

    // Use a reliable, common light style for initial render: 'basic'
    const initialStyleUrl = `https://api.maptiler.com/maps/basic/style.json?key=qouYd4hDXkrIIxMJOXH8`;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: initialStyleUrl, // Use 'basic' style
      center: POLAND_CENTER,
      zoom: 6,
      minZoom: 5,
      maxBounds: [
        [10, 45],
        [30, 58],
      ],
    });

    map.current.on("load", () => {
      // Add all markers once the map style is loaded
      // Clean up previous markers if they exist
      markerRefs.current.forEach((marker) => marker.remove());
      markerRefs.current = [];

      placesData.forEach((place) => {
        const markerElement = document.createElement("div");
        markerElement.className = "map-marker";
        markerElement.dataset.id = place.id;

        const marker = new maplibregl.Marker({ element: markerElement })
          .setLngLat(place.coordinates)
          .addTo(map.current);

        markerRefs.current.push(marker);

        // POPUP AND SIDEBAR LOGIC
        markerElement.addEventListener("click", () => {
          const popupContent = `
            <div style="padding: 5px; max-width: 250px;">
              <h3 style="font-weight: bold; margin-bottom: 5px;">${place.name}</h3>
              <p style="margin-bottom: 10px; font-size: 0.9em;">${place.description}</p>
              <button id="view-details-${place.id}" style="background-color: #4f46e5; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; width: 100%;">
                View Details
              </button>
            </div>
          `;

          const popup = new maplibregl.Popup({ offset: 25 })
            .setLngLat(place.coordinates)
            .setHTML(popupContent)
            .addTo(map.current);

          popup.on("open", () => {
            document
              .getElementById(`view-details-${place.id}`)
              .addEventListener("click", () => {
                openSidebar(place.id);
                popup.remove();
              });
          });
        });
      });
    });

    // Clean up function: removes map instance when component unmounts
    return () => {
      markerRefs.current.forEach((marker) => marker.remove());
      map.current?.remove();
    };
  }, [openSidebar]);

  // 2. EFFECT for Theme Change (Runs when isDarkMode changes)
  useEffect(() => {
    if (map.current) {
      // Use 'dark' for dark mode and 'basic' for light mode
      const styleId = isDarkMode ? "dark" : "basic";
      const styleUrl = `https://api.maptiler.com/maps/${styleId}/style.json?key=qouYd4hDXkrIIxMJOXH8`;
      map.current.setStyle(styleUrl);
    }
  }, [isDarkMode]); // Re-run when dark mode is toggled

  return (
    <div
      ref={mapContainer}
      className="map-container w-full h-full"
      style={{ height: "100vh", width: "100vw" }}
    />
  );
};

export default MapContainer;
