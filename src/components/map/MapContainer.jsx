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
        "https://api.maptiler.com/maps/streets-v2/style.json?key=qouYd4hDXkrIIxMJOXH8",
      center: [19.15, 51.92],
      zoom: 6.2,
    });

    map.current.on("load", () => {
      placesData.forEach((place) => {
        // 1. Create the element
        const el = document.createElement("div");

        // 2. Apply the "Indigo Teardrop" style DIRECTLY in JS
        el.style.width = "32px";
        el.style.height = "32px";
        el.style.backgroundColor = "#6366f1"; // Indigo
        el.style.border = "2px solid white";
        el.style.borderRadius = "50% 50% 50% 0"; // This makes the point
        el.style.transform = "rotate(-45deg)"; // Rotates it into a pin shape
        el.style.cursor = "pointer";
        el.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";

        // 3. Add to map with 'bottom' anchor to stop the drift
        // The tip of the teardrop is now the anchor point
        new maplibregl.Marker({
          element: el,
          anchor: "bottom",
          offset: [0, 5], // Tiny adjustment to put the tip exactly on the dot
        })
          .setLngLat(place.coordinates)
          .addTo(map.current);

        el.addEventListener("click", () => {
          map.current.flyTo({
            center: place.coordinates,
            zoom: 8,
            essential: true,
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
