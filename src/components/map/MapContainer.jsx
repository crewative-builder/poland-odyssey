import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import placesData from "../../data/places.json";
import appStore from "../../store/appStore";

const MapContainer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRefs = useRef([]);
  const { openSidebar } = appStore();

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // Using 'streets-v2' which is the most reliable Maptiler style
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=qouYd4hDXkrIIxMJOXH8`,
      center: [19.15, 51.92],
      zoom: 6,
    });

    map.current.on("load", () => {
      placesData.forEach((place) => {
        // Create HTML element for marker
        const el = document.createElement("div");
        el.className = "map-marker";

        // Add Marker to Map
        const marker = new maplibregl.Marker({ element: el })
          .setLngLat(place.coordinates)
          .addTo(map.current);

        // Click Event
        el.addEventListener("click", () => {
          openSidebar(place.id);
        });

        markerRefs.current.push(marker);
      });
    });

    return () => map.current?.remove();
  }, [openSidebar]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default MapContainer;
