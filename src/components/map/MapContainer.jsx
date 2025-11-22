// Poland geographical center
const POLAND_CENTER = [19.15, 51.92];

const MapContainer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const { openSidebar, isDarkMode } = appStore();
  const markerRefs = useRef([]); // Use a ref to keep track of markers

  // Fix 1: Apply Dark/Light map style change
  useEffect(() => {
    if (map.current) {
      // Change map style based on theme mode
      const styleId = isDarkMode ? "dark-v2" : "streets-v2";
      map.current.setStyle(
        `https://api.maptiler.com/maps/${styleId}/style.json?key=YOUR_MAPTILER_API_KEY`
      );
    }
  }, [isDarkMode]);

  // Fix 2: Initialize Map and Markers ONLY ONCE
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // Initial style (will be overridden by the theme useEffect)
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=YOUR_MAPTILER_API_KEY`,
      center: POLAND_CENTER,
      zoom: 6,
      minZoom: 5,
      maxBounds: [
        [10, 45],
        [30, 58],
      ],
    });

    map.current.on("load", () => {
      // Clean up previous markers if they exist
      markerRefs.current.forEach((marker) => marker.remove());
      markerRefs.current = [];

      placesData.forEach((place) => {
        const markerElement = document.createElement("div");
        markerElement.className = "map-marker";
        markerElement.dataset.id = place.id; // Added data-id for better tracking

        const marker = new maplibregl.Marker({ element: markerElement })
          .setLngLat(place.coordinates)
          .addTo(map.current);

        markerRefs.current.push(marker);

        // POPUP AND SIDEBAR LOGIC (Remains the same)
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

    // Clean up function: removes map instance when component unmounts
    return () => {
      markerRefs.current.forEach((marker) => marker.remove());
      map.current?.remove();
    };
  }, []); // Empty dependency array ensures it runs only ONCE

  return (
    <div
      ref={mapContainer}
      className="map-container w-full h-full"
      style={{ height: "100vh", width: "100vw" }}
    />
  );
};

export default MapContainer;
