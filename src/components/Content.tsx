import { CircularProgress, Stack, Typography } from '@mui/material';
import DeliveryForm from './DeliveryForm';
import Map from './Map';
import colors from '../styles/colors';
import DeliveryContextProvider from '../contexts/DeliveryContext';
import { Libraries, useLoadScript } from '@react-google-maps/api';

const libraries = ['places'] as Libraries;

const Content = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || 'dummyString',
    libraries,
  });

  if (loadError) return <Typography variant='h2'>Oops! Something went wrong.</Typography>;

  return (
    <>
      {isLoaded ? (
        <Stack
          sx={{
            height: '100%',
            flexDirection: {
              md: 'row',
            },
          }}
        >
          <DeliveryContextProvider>
            <DeliveryForm
              sx={{
                bgcolor: colors.gray,
                flexGrow: {
                  xs: 0,
                  md: 1,
                },
              }}
            />
            <Map
              sx={{
                flexGrow: 7,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </DeliveryContextProvider>
        </Stack>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Content;
