import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibregl/dist/maplibre-gl.css";
import placesData from "../../data/places.json";
import appStore from "../../store/appStore";

// Poland geographical center
const POLAND_CENTER = [19.15, 51.92];

const MapContainer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const { openSidebar } = appStore();

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // *** 🚨 CRITICAL: REPLACE THIS WITH YOUR ACTUAL MAPTILER KEY/STYLE URL ***
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=qouYd4hDXkrIIxMJOXH8`,
      center: POLAND_CENTER, // New Center
      zoom: 6,
      minZoom: 5,
      maxBounds: [
        [10, 45],
        [30, 58],
      ],
    });

    map.current.on("load", () => {
      placesData.forEach((place) => {
        const markerElement = document.createElement("div");
        markerElement.className = "map-marker";

        const marker = new maplibregl.Marker({ element: markerElement })
          .setLngLat(place.coordinates)
          .addTo(map.current);

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

    return () => map.current?.remove();
  }, [openSidebar]);

  return (
    <div
      ref={mapContainer}
      className="map-container w-full h-full"
      style={{ height: "100vh", width: "100vw" }}
    />
  );
};

export default MapContainer;
