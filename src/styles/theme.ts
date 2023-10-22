import { createTheme } from '@mui/material';
import { red, green } from '@mui/material/colors';
import colors from './colors';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.orange,
      contrastText: colors.white,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {},
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'standard' &&
            ownerState.severity === 'error' ? {
              border: `1px solid ${red[500]}`,
            } : {
              border: `1px solid ${green[300]}`
            }),
        }),
      },
    },
  },
});

export { theme };
