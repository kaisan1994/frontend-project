const convertRouteToGoogleLatLng = (route: string[]): google.maps.LatLngLiteral => {
  if (!route || route.length !== 2) throw new Error('Invalid route.');
  return {
    lat: parseFloat(route[0]),
    lng: parseFloat(route[1]),
  };
};

const constructDirections = (
  origin: google.maps.LatLngLiteral | undefined | null,
  destination: google.maps.LatLngLiteral | undefined | null,
  callback: (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => void,
  waypoints: google.maps.LatLngLiteral[] | null = null
) => {
  if (!origin || !destination) return null;

  const service = new google.maps.DirectionsService();
  service.route(
    {
      origin,
      destination,
      ...(waypoints &&
        waypoints.length > 0 && {
          waypoints: waypoints.map((waypoint) => ({
            location: waypoint,
            stopover: true,
          })),
        }),
      travelMode: google.maps.TravelMode.DRIVING,
    },
    callback
  );
};

export { convertRouteToGoogleLatLng, constructDirections };
