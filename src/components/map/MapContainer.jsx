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
      zoom: 6.5, // Slightly zoomed in from 6.0 for better visibility
      trackResize: true,
    });

    map.current.on("load", () => {
      map.current.resize();

      placesData.forEach((place) => {
        // Create the Wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "marker-wrapper";

        // Create the Precise Dot at the bottom
        const dot = document.createElement("div");
        dot.className = "marker-dot";
        wrapper.appendChild(dot);

        // Create the Indigo Pin above it
        const pin = document.createElement("div");
        pin.className = "map-marker";
        wrapper.appendChild(pin);

        // Add Marker centered on the dot
        new maplibregl.Marker({
          element: wrapper,
          anchor: "bottom", // The dot is at the bottom of the wrapper
        })
          .setLngLat(place.coordinates)
          .addTo(map.current);

        wrapper.addEventListener("click", () => {
          map.current.flyTo({
            center: place.coordinates,
            zoom: 9,
            padding: { right: 300 },
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
