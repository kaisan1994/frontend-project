import { Box, BoxProps } from '@mui/material';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useCallback, useContext, useRef, useMemo, useState, useEffect } from 'react';
import { DeliveryContext } from '../contexts/DeliveryContext';
import { constructDirections, convertRouteToGoogleLatLng } from '../helper/mapHelper';

// inno center lat and lng.
const initialCenter: google.maps.LatLngLiteral = {
  lat: 22.335666714834517,
  lng: 114.17591097201647,
};

const Map = (props: BoxProps) => {
  const mapRef = useRef<google.maps.Map>();

  const { routesInfo } = useContext(DeliveryContext);
  const { routes } = routesInfo || {};
  const positions = useMemo(() => routes?.map((route) => convertRouteToGoogleLatLng(route)), [routes]);

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (positions && positions.length > 0) {
      const positionClone = [...positions];
      const origin = positionClone.shift();
      const destination = positionClone.pop();

      constructDirections(
        origin,
        destination,
        (result, status) => {
          if (status === 'OK' && result) {
            setDirections(result);
          }
        },
        positionClone
      );
    } else {
      setDirections(null);
    }
  }, [positions]);

  return (
    <Box {...props}>
      <GoogleMap
        mapContainerStyle={{
          height: '100%',
          width: '100%',
        }}
        zoom={14}
        onLoad={onMapLoad}
        center={initialCenter}
      >
        {directions && <DirectionsRenderer directions={directions}></DirectionsRenderer>}

        {positions?.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
      </GoogleMap>
    </Box>
  );
};

export default Map;
