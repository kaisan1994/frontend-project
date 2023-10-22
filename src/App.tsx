import { ThemeProvider, CssBaseline } from '@mui/material';
import Content from './components/Content';
import './index.css';
import { theme } from './styles/theme';
import AlertContextProvider from './contexts/AlertContext';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertContextProvider>
        <Content />
      </AlertContextProvider>
    </ThemeProvider>
  );
};

export default App;
