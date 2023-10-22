import { Box, BoxProps, CircularProgress, Typography } from '@mui/material';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const initialCenter: google.maps.LatLngLiteral = {
  lat: 22.335666714834517,
  lng: 114.17591097201647,
};

const Map = (props: BoxProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || 'dummyString',
  });

  if (loadError) return <Typography variant='h2'>Oops! Something went wrong.</Typography>;

  return (
    <Box {...props}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            height: '100%',
            width: '100%',
          }}
          zoom={14}
          center={initialCenter}
        />
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default Map;
