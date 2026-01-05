async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;

  const response = await fetch(url);

  const data = await response.json();

  if (!data.length) {
    return null;
  }

  return {
    lat: data[0].lat,
    lng: data[0].lon
  };
}

module.exports = geocodeAddress;
