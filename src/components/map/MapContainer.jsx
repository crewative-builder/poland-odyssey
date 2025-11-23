import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import placesData from "../../data/places.json";
import appStore from "../../store/appStore";

// Poland geographical center
const POLAND_CENTER = [19.15, 51.92];
const INITIAL_ZOOM = 6;

// Function to initialize and add all markers
const initializeMarkers = (mapInstance, openSidebar, markerRefs) => {
  markerRefs.current.forEach((marker) => marker.remove());
  markerRefs.current = [];

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
  // Attempt to set text to English using 'name_en' property on various layers
  const layers = mapInstance.getStyle().layers;
  if (!layers) return;

  layers.forEach((layer) => {
    if (
      layer.layout &&
      layer.layout["text-field"] &&
      !layer.id.includes("raster")
    ) {
      try {
        // Try setting to English name property (name_en is most common)
        mapInstance.setLayoutProperty(layer.id, "text-field", [
          "get",
          "name_en",
        ]);
      } catch (e) {
        // If that fails, the layer is likely not present or the style doesn't support it.
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
    // FINAL, high-compatibility styles: 'positron' for light, 'dark-matter' for dark
    // If 'dark-matter' fails, it will likely fall back to a generic simple style.
    const styleId = isDark ? "dark-matter" : "positron";
    return `https://api.maptiler.com/maps/${styleId}/style.json?key=YOUR_MAPTILER_API_KEY`;
  };

  // 1. EFFECT for Initial Map Setup (Runs ONCE)
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: getStyleUrl(isDarkMode),
      center: POLAND_CENTER,
      zoom: INITIAL_ZOOM,
      minZoom: 5,
      maxBounds: [
        [10, 45],
        [30, 58],
      ],
    });

    // Add markers and set language only when the initial style is fully loaded
    map.current.once("style.load", () => {
      initializeMarkers(map.current, openSidebar, markerRefs);
      setMapLanguage(map.current);
    });

    // Clean up function
    return () => {
      markerRefs.current.forEach((marker) => marker.remove());
      map.current?.remove();
    };
  }, [openSidebar]);

  // 2. EFFECT for Theme Change (Runs when isDarkMode changes)
  useEffect(() => {
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
