import React, { useRef, useEffect } from "react"; // Removed useState
import maplibregl from "maplibre-gl";
import placesData from "../../data/places.json";
import appStore from "../../store/appStore";

// Poland geographical center
const POLAND_CENTER = [19.15, 51.92];
const INITIAL_ZOOM = 6;
const MAPTILER_KEY = "qouYd4hDXkrIIxMJOXH8"; // Define key once

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

    // POPUP AND SIDEBAR LOGIC (UNCHANGED)
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
  const style = mapInstance.getStyle();
  if (!style || !style.layers) return;

  style.layers.forEach((layer) => {
    // Target layers that contain text labels (MapTiler standard: 'name_en')
    if (
      layer.layout &&
      layer.layout["text-field"] &&
      !layer.id.includes("raster")
    ) {
      try {
        mapInstance.setLayoutProperty(layer.id, "text-field", [
          "get",
          "name_en",
        ]);
      } catch (e) {
        // Fails silently if layer is not present, which is fine
      }
    }
  });
};

const MapContainer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRefs = useRef([]);

  const { openSidebar, isDarkMode } = appStore();

  // Function to determine the style URL
  const getStyleUrl = (isDark) => {
    // Light mode: 'positron' (Confirmed working on your map)
    // Dark mode: 'dataviz-dark' (A highly compatible dark style if dark-matter fails)
    const styleId = isDark ? "dataviz-dark" : "positron";
    return `https://api.maptiler.com/maps/${styleId}/style.json?key=${MAPTILER_KEY}`;
  };

  // 1. EFFECT for Initial Map Setup (Runs ONCE)
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: getStyleUrl(isDarkMode), // Use style based on initial theme state
      center: POLAND_CENTER,
      zoom: INITIAL_ZOOM,
      minZoom: 5,
      maxBounds: [
        [10, 45],
        [30, 58],
      ],
    });

    // Use 'idle' event to ensure everything is loaded, drawn, and ready
    map.current.once("idle", () => {
      initializeMarkers(map.current, openSidebar, markerRefs);
      setMapLanguage(map.current);
    });

    // Clean up function
    return () => {
      markerRefs.current.forEach((marker) => marker.remove());
      map.current?.remove();
    };
  }, [openSidebar, isDarkMode]);
  // isDarkMode is included here so the initial style is chosen correctly on first load.

  // 2. EFFECT for Theme Change (Runs when isDarkMode changes)
  useEffect(() => {
    if (map.current) {
      // Load the new style
      map.current.setStyle(getStyleUrl(isDarkMode));

      // Remove markers immediately and re-add them when the new style is fully loaded and drawn
      map.current.once("idle", () => {
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
