import { TextField, Stack, Button, styled, SxProps } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { DeliveryRequest } from '../interfaces/Delivery';
import { API, responseStatus } from '../constants/api';
import { httpRequest } from '../apiServices';
import { useContext } from 'react';
import { AlertContext } from './AlertWrapper';

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
  const { handleSubmit, reset, control } = useForm<DeliveryRequest>({
    defaultValues: initialFormValues,
  });

  const onFormSubmit = async (data: DeliveryRequest) => {
    try {
      const res = await httpRequest({
        api: API.route,
        method: 'POST',
        data: {
          origin: data.startingPoint,
          destination: data.dropOffPoint,
        },
      });

      const resObject = await res.json();
      const { status } = resObject;

      if (status === responseStatus.inProgress) {
        setTimeout(() => {
          onFormSubmit(data);
        }, 1000);
      } else if (status === responseStatus.failure) {
        throw new Error(resObject.error);
      } else if (status === responseStatus.success) {
        
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
    }
  };

  return (
    <MuiForm onSubmit={handleSubmit(onFormSubmit)} sx={props.sx}>
      <Stack
        sx={{
          p: 3,
          rowGap: 3,
        }}
      >
        <Controller
          control={control}
          name='startingPoint'
          rules={{
            required: '* Starting point is required',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='Starting Point'
              value={value}
              error={!!error?.message}
              helperText={error?.message}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name='dropOffPoint'
          rules={{
            required: '* Drop-off point is required',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='Drop-off Point'
              value={value}
              error={!!error?.message}
              helperText={error?.message}
              onChange={onChange}
            />
          )}
        />
        <Stack justifyContent='space-between' flexDirection='row'>
          <Button variant='outlined' type='button' onClick={() => reset()}>
            Reset
          </Button>
          <Button variant='contained' type='submit'>
            Submit
          </Button>
        </Stack>
      </Stack>
    </MuiForm>
  );
};

export default DeliveryForm;
