import React, { useRef, useEffect, useState } from "react"; // Added useState
import maplibregl from "maplibre-gl";
import placesData from "../../data/places.json";
import appStore from "../../store/appStore";

// Poland geographical center
const POLAND_CENTER = [19.15, 51.92];
const INITIAL_ZOOM = 6;

// Function to initialize and add all markers
const initializeMarkers = (mapInstance, openSidebar, markerRefs) => {
  // 1. Remove any existing markers
  markerRefs.current.forEach((marker) => marker.remove());
  markerRefs.current = [];

  // 2. Add all new markers
  placesData.forEach((place) => {
    const markerElement = document.createElement("div");
    markerElement.className = "map-marker";
    markerElement.dataset.id = place.id;

    const marker = new maplibregl.Marker({ element: markerElement })
      .setLngLat(place.coordinates)
      .addTo(mapInstance);

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
        .addTo(mapInstance);

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
};

// Function to set map labels to English
const setMapLanguage = (mapInstance) => {
  // Check if the layer for landuse/admin/place names exists before setting layout
  if (mapInstance.getLayer("place_other")) {
    mapInstance.setLayoutProperty("place_other", "text-field", [
      "get",
      "name_en",
    ]);
  }
  if (mapInstance.getLayer("place_city")) {
    mapInstance.setLayoutProperty("place_city", "text-field", [
      "get",
      "name_en",
    ]);
  }
  // Note: Maptiler layers can vary, this is a best-effort fix
};

const MapContainer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRefs = useRef([]);

  const { openSidebar, isDarkMode } = appStore();

  // State to manage the active map style URL
  const getStyleUrl = (isDark) => {
    // Use the official MapTiler style names that are known to work with basic keys
    const styleId = isDark ? "dark-matter" : "basic-v2"; // 'dark-matter' and 'basic-v2' are reliable
    return `https://api.maptiler.com/maps/${styleId}/style.json?key=qouYd4hDXkrIIxMJOXH8`;
  };

  const [mapStyleUrl, setMapStyleUrl] = useState(getStyleUrl(isDarkMode));

  // 1. EFFECT for Initial Map Setup (Runs ONCE)
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyleUrl, // Use state-managed style URL
      center: POLAND_CENTER,
      zoom: INITIAL_ZOOM,
      minZoom: 5,
      maxBounds: [
        [10, 45],
        [30, 58],
      ],
    });

    // Add markers and set language only when the initial style is fully loaded
    map.current.on("style.load", () => {
      initializeMarkers(map.current, openSidebar, markerRefs);
      setMapLanguage(map.current);
    });

    // Clean up function
    return () => {
      markerRefs.current.forEach((marker) => marker.remove());
      map.current?.remove();
    };
  }, [openSidebar, mapStyleUrl]); // Added mapStyleUrl to deps to handle the theme change robustly

  // 2. EFFECT for Theme Change (Runs when isDarkMode changes)
  useEffect(() => {
    // When dark mode changes, update the URL state, which triggers the first useEffect
    setMapStyleUrl(getStyleUrl(isDarkMode));

    if (map.current) {
      // Remove markers immediately before style change
      markerRefs.current.forEach((marker) => marker.remove());
      markerRefs.current = [];

      // Load the new style
      map.current.setStyle(getStyleUrl(isDarkMode));

      // Re-add markers and set language once the new style is loaded
      map.current.once("style.load", () => {
        initializeMarkers(map.current, openSidebar, markerRefs);
        setMapLanguage(map.current);
      });
    }
  }, [isDarkMode, openSidebar]);

  return (
    <div
      ref={mapContainer}
      className="map-container w-full h-full"
      style={{ height: "100vh", width: "100vw" }}
    />
  );
};

export default MapContainer;
