document.addEventListener("DOMContentLoaded", () => {
  if (!window.listingCoords) return;

  const { lat, lng, location } = window.listingCoords;

  const map = L.map("map").setView([lat, lng], 14);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup("📍" + location)
    .openPopup();

  map.zoomControl.setPosition('topright');
});
