import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import placesData from "../../data/places.json";
import appStore from "../../store/appStore";

const MapContainer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const { openSidebar } = appStore();

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/streets-v2/style.json?key=YOUR_MAPTILER_API_KEY",
      center: [19.15, 51.92],
      zoom: 6,
      trackResize: true, // Ensures map updates if window size changes
    });

    map.current.on("load", () => {
      // Force a resize calculation to prevent drifting on initial load
      map.current.resize();

      placesData.forEach((place) => {
        // Create a stable wrapper
        const container = document.createElement("div");
        container.className = "marker-container";

        // Create the actual pin
        const pin = document.createElement("div");
        pin.className = "map-marker";
        container.appendChild(pin);

        // Add Marker with explicit 'bottom' anchor
        new maplibregl.Marker({
          element: container,
          anchor: "bottom", // CRITICAL: This keeps the point on the coordinate
        })
          .setLngLat(place.coordinates)
          .addTo(map.current);

        container.addEventListener("click", () => {
          map.current.flyTo({
            center: place.coordinates,
            zoom: 9,
            padding: { right: 300 }, // Keeps point visible when sidebar opens
          });
          openSidebar(place.id);
        });
      });
    });

    return () => map.current?.remove();
  }, [openSidebar]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default MapContainer;
