import { ThemeProvider, CssBaseline } from '@mui/material';
import Content from './components/Content';
import './index.css';
import { theme } from './styles/theme';
import AlertWrapper from './components/AlertWrapper';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertWrapper>
        <Content />
      </AlertWrapper>
    </ThemeProvider>
  );
};

export default App;
