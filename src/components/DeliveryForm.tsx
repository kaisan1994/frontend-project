import { Stack, Button, styled, SxProps, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { DeliveryRequest } from '../interfaces/Delivery';
import { getRouteToken, getRoutesInfo } from '../services/apiServices';
import { useContext } from 'react';
import { AlertContext } from '../contexts/AlertContext';
import { DeliveryContext } from '../contexts/DeliveryContext';
import Input from './Input';

type DeliveryFormProps = {
  sx?: SxProps;
};

const initialFormValues: DeliveryRequest = {
  startingPoint: '',
  dropOffPoint: '',
};

const MuiForm = styled('form')({});

const DeliveryForm = (props: DeliveryFormProps) => {
  const { showAlert } = useContext(AlertContext);
  const { setRoutesInfo, routesInfo, loading, setLoading } = useContext(DeliveryContext);
  const { handleSubmit, reset, control } = useForm<DeliveryRequest>({
    defaultValues: initialFormValues,
  });

  const onFormSubmit = async (data: DeliveryRequest) => {
    setLoading(true);
    try {
      const { token } = await getRouteToken(data);
      const routesInfo = await getRoutesInfo(token);
      const { path, total_distance, total_time } = routesInfo || {};

      if (routesInfo && path && path.length > 0) {
        setRoutesInfo({
          routes: path,
          totalDistance: total_distance,
          totalTime: total_time,
        });
      } else {
        setRoutesInfo(null);
      }
    } catch (error) {
      let errorMessage: string = 'Something went wrong.';

      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      showAlert({
        message: errorMessage,
        severity: 'error',
      });
      setRoutesInfo(null);
    }
    setLoading(false);
  };

  return (
    <MuiForm onSubmit={handleSubmit(onFormSubmit)} sx={props.sx}>
      <Stack
        sx={{
          p: 3,
          rowGap: 3,
        }}
      >
        <Stack rowGap={3}>
          <Controller
            control={control}
            name='startingPoint'
            rules={{
              required: '* Starting point is required',
            }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Input onChange={onChange} label='Starting Point' error={error} />
            )}
          />
          <Controller
            control={control}
            name='dropOffPoint'
            rules={{
              required: '* Drop-off point is required',
            }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Input onChange={onChange} label='Drop-off Point' error={error} />
            )}
          />
        </Stack>

        <Stack>
          <Typography component='p'>Total Distance: {routesInfo?.totalDistance || 'N/A'}</Typography>
          <Typography component='p'>Total Time: {routesInfo?.totalTime || 'N/A'}</Typography>
        </Stack>

        <Stack justifyContent='space-between' flexDirection='row'>
          <Button variant='outlined' type='button' onClick={() => reset()}>
            Reset
          </Button>
          <Button disabled={loading} variant='contained' type='submit'>
            Submit
          </Button>
        </Stack>
      </Stack>
    </MuiForm>
  );
};

export default DeliveryForm;
