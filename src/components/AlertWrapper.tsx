import { Alert, AlertProps, Snackbar, SnackbarProps } from '@mui/material';
import { PropsWithChildren, createContext, useState } from 'react';

type AlertParams = Pick<SnackbarProps, 'message'> & Pick<AlertProps, 'severity'>;

type AlertContextProps = {
  showAlert: (params: AlertParams) => void;
};

const AlertContext = createContext<AlertContextProps>({
  showAlert: () => {},
});

const AlertWrapper = (props: PropsWithChildren) => {
  const { children } = props;
  const [open, setOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState<AlertParams | null>(null);

  const showAlert = (params: AlertParams) => {
    setAlertInfo(params);
    setOpen(true);
  };

  const onBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setTimeout(() => setAlertInfo(null), 1000);
  };

  return (
    <AlertContext.Provider
      value={{
        showAlert,
      }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={onBarClose}
      >
        <Alert severity={alertInfo?.severity} onClose={onBarClose}>
          {alertInfo?.message || ''}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export { AlertWrapper as default, AlertContext };
