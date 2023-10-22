import { Stack } from '@mui/material';
import DeliveryForm from './DeliveryForm';
import Map from './Map';
import colors from '../styles/colors';

const Content = () => {
  return (
    <Stack
      sx={{
        height: '100%',
        flexDirection: {
          md: 'row',
        },
      }}
    >
      <DeliveryForm
        sx={{
          bgcolor: colors.gray,
          flexGrow: {
            xs: 0,
            md: 1,
          },
        }}
      />
      {/* <Map
        sx={{
          flexGrow: 7,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      /> */}
    </Stack>
  );
};

export default Content;
