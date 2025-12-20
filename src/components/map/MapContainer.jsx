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
      zoom: 6.2,
    });

    map.current.on("load", () => {
      placesData.forEach((place) => {
        const el = document.createElement("div");
        el.className = "map-marker";

        // anchor: 'bottom' ensures the tip of the pin is exactly on the location
        new maplibregl.Marker({
          element: el,
          anchor: "bottom",
        })
          .setLngLat(place.coordinates)
          .addTo(map.current);

        el.addEventListener("click", () => {
          map.current.flyTo({ center: place.coordinates, zoom: 8 });
          openSidebar(place.id);
        });
      });
    });

    return () => map.current?.remove();
  }, [openSidebar]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default MapContainer;
