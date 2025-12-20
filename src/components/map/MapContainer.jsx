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
      center: [21.0122, 52.2297], // Centered on Warsaw
      zoom: 6,
    });

    map.current.on("load", () => {
      placesData.forEach((place) => {
        const el = document.createElement("div");

        // Style the Indigo Teardrop
        el.style.width = "30px";
        el.style.height = "30px";
        el.style.backgroundColor = "#4f46e5"; // Deep Indigo
        el.style.border = "2px solid white";
        el.style.borderRadius = "50% 50% 50% 0";
        el.style.transform = "rotate(-45deg)";
        el.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
        el.style.cursor = "pointer";

        new maplibregl.Marker({
          element: el,
          anchor: "bottom-left", // This keeps the POINT on the coordinate
        })
          .setLngLat(place.coordinates)
          .addTo(map.current);

        el.addEventListener("click", () => {
          map.current.flyTo({ center: place.coordinates, zoom: 10 });
          openSidebar(place.id);
        });
      });
    });

    return () => map.current?.remove();
  }, [openSidebar]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default MapContainer;
